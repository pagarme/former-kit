import React, { Fragment } from 'react'
import shortid from 'shortid'
import {
  equals,
  isNil,
  mergeRight,
} from 'ramda'

import {
  arrayOf,
  bool,
  element,
  func,
  oneOf,
  shape,
  string,
} from 'prop-types'

import moment from 'moment'
import MaskedInput from 'react-maskedinput'

import ThemeConsumer from '../ThemeConsumer'
import { isMomentPropValidation } from '../validations'
import DateSelector, { getPreset, getPresetLimits } from '../DateSelector'

import {
  inputDateMask,
  momentToText,
  textToMoment,
  validateRange,
} from './dateHelpers'

import {
  endClasses,
  inputClasses,
  startClasses,
} from './classNames'

const consumeTheme = ThemeConsumer('UIDateInput')

const defaultStrings = {
  end: 'End',
  select: 'Select a preset',
  start: 'Start',
}

const getStrings = strings => ({
  ...defaultStrings,
  ...strings,
})

/**
 * Input component designed to receive one or two dates, can have a mask
 * for the input and enables the date selection using a calendarlike selector.
 * When dates are selected, the first one is the start period and the second is
 * the end one. The date selection callback will always provide two dates, if
 * the component is showing only one date, the callback will receive the same date
 * as start and end.
 */
class DateInput extends React.Component {
  constructor (props) {
    super(props)

    const presetObject = props.selectedPreset
      ? getPreset(props.selectedPreset, props.presets)
      : null

    const dates = presetObject
      ? momentToText(getPresetLimits(presetObject.date()))
      : momentToText(props.dates)

    const selectionMode = presetObject
      ? presetObject.mode
      : props.selectionMode

    this.state = {
      dates,
      focusedInput: null,
      selectionMode,
      selectedPreset: props.selectedPreset,
    }

    this.name = shortid.generate()
    this.getNextInput = this.getNextInput.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleDatesChange = this.handleDatesChange.bind(this)
    this.handleStartInputChange = this.handleInputChange.bind(this, 'start')
    this.handleEndInputChange = this.handleInputChange.bind(this, 'end')
    this.handleInputFocus = this.handleInputFocus.bind(this)
    this.handlePresetChange = this.handlePresetChange.bind(this)
  }

  componentDidUpdate (prevProps) {
    const {
      dates: {
        end: receivedEnd,
        start: receivedStart,
      },
    } = this.props

    const {
      dates: {
        end: currentEnd,
        start: currentStart,
      },
    } = this.state

    const isSameStart = receivedStart && receivedStart.isSame(currentStart, 'day')
    const isSameEnd = receivedEnd && receivedEnd.isSame(currentEnd, 'day')

    if (!equals(prevProps, this.props) && (!isSameStart || !isSameEnd)) {
      this.setState({ // eslint-disable-line react/no-did-update-set-state
        dates: momentToText(this.props.dates),
      })
    }
  }

  getNextInput () {
    const {
      dates,
    } = this.state

    const nextInputToFocus = dates.start ? 'endDate' : 'startDate'
    return nextInputToFocus
  }

  handleConfirm (value) {
    const {
      limits,
      onConfirm,
    } = this.props

    const { showPopover } = this.state

    const momentDates = textToMoment(value)

    const {
      isValidStart,
      isValidEnd,
    } = validateRange(limits, momentDates)

    if (isValidStart && isValidEnd && showPopover) {
      this.setState({
        focusedInput: null,
        showPopover: false,
      })

      onConfirm(momentDates)
    }
  }

  handleDatesChange (dates) {
    const {
      focusedInput,
      selectionMode,
    } = this.state

    this.setState({
      dates: momentToText(dates),
      focusedInput: selectionMode === 'period' && focusedInput === 'startDate'
        ? 'endDate'
        : 'startDate',
    })

    this.props.onChange(dates)
  }

  handleInputChange (field, event) {
    const {
      limits,
      onChange,
    } = this.props

    const { target: { value } } = event

    const dates = mergeRight(
      this.state.dates,
      { [field]: value }
    )

    if (this.state.selectionMode === 'single') {
      dates.start = value
      dates.end = value
    }

    this.setState({
      dates,
      selectedPreset: '',
    })

    const momentDates = textToMoment(dates)
    const { isValidStart, isValidEnd } = validateRange(limits, momentDates)

    if (isValidStart && isValidEnd) {
      onChange(momentDates)
    }
  }

  handleInputFocus (focusedInput) {
    const state = {
      focusedInput,
    }

    if (!this.state.showPopover) {
      state.showPopover = true
    }

    if (this.state.focusedInput !== focusedInput) {
      this.setState(state)
    }
  }

  handlePresetChange (dates, preset) {
    this.setState({
      dates: momentToText(dates),
      selectedPreset: preset.key,
      selectionMode: preset.mode,
    })

    this.props.onPresetChange(dates, preset)
  }

  renderInputs () {
    const {
      icon,
      limits,
      strings,
      showCalendar,
      theme,
    } = this.props

    const {
      dates,
      focusedInput,
      selectionMode,
    } = this.state

    const momentDates = textToMoment(dates)
    const { isValidStart, isValidEnd } = validateRange(limits, momentDates)

    const translatedStrings = getStrings(strings)

    const initialPlaceholder = dates.start || (
      showCalendar
        ? translatedStrings.start
        : translatedStrings.select
    )

    return (
      <Fragment>
        {!isNil(icon) && (
          <div className={theme.icon}>
            {icon}
          </div>
        )}
        <div
          className={startClasses({
            theme,
            focusedInput,
            isValid: isValidStart,
          })}
        >
          <MaskedInput
            autoComplete="off"
            className={theme.input}
            id={`${this.name}-startDate`}
            mask={inputDateMask()}
            name="startDate"
            onBlur={this.handleInputBlur}
            onChange={event => this.handleStartInputChange(event)}
            onFocus={() => this.handleInputFocus('startDate')}
            placeholder={initialPlaceholder}
            placeholderChar=" "
            size="8"
            value={dates.start}
          />
          <span className={theme.expander}>
            {initialPlaceholder}
          </span>
        </div>
        { selectionMode === 'period' &&
          <div className={theme.separator} />
        }
        { selectionMode === 'period'
          ? (
            <div
              className={endClasses({
                theme,
                focusedInput,
                isValid: isValidEnd,
              })}
            >
              <MaskedInput
                autoComplete="off"
                className={theme.input}
                mask={inputDateMask()}
                name="endDate"
                onChange={event => this.handleEndInputChange(event)}
                onFocus={() => this.handleInputFocus('endDate')}
                placeholder={translatedStrings.end}
                placeholderChar=" "
                size="8"
                value={dates.end}
              />
              <span className={theme.expander}>
                {dates.end || translatedStrings.end}
              </span>
            </div>
          ) : (
            null
          )
        }
      </Fragment>
    )
  }

  render () {
    const {
      active,
      isValidDay,
      limits,
      theme,
      presets,
      showCalendar,
      showSidebar,
      strings,
    } = this.props

    const {
      dates,
      focusedInput,
      selectionMode,
      selectedPreset,
      showPopover,
    } = this.state

    const momentDates = textToMoment(dates)
    const { isValidStart, isValidEnd } = validateRange(limits, momentDates)
    const isValidDates = isValidStart && isValidEnd

    return (
      <DateSelector
        dates={isValidDates ? momentDates : {}}
        focusedInput={focusedInput}
        isValidDay={isValidDay}
        onConfirm={this.handleConfirm}
        onChange={this.handleDatesChange}
        onPresetChange={this.handlePresetChange}
        presets={presets}
        selectedPreset={selectedPreset}
        selectionMode={selectionMode}
        showCalendar={showCalendar}
        showSidebar={showSidebar}
        strings={strings}
        visible={showPopover}
      >
        <div
          className={inputClasses({
            theme,
            active,
            error: !isValidDates,
            focused: showCalendar,
          })}
        >
          {this.renderInputs()}
        </div>
      </DateSelector>
    )
  }
}

DateInput.propTypes = {
  /**
   * Enable/disable the component.
   */
  active: bool,
  /**
   * Initial dates to be pre selected.
   */
  dates: shape({
    start: isMomentPropValidation,
    end: isMomentPropValidation,
  }),
  /**
   * Custom icon which will be shown in the component left side.
   */
  icon: element,
  /**
   * Function that returns a boolean wheter the date is valid
   */
  isValidDay: func,
  /**
   * Limit dates for range selections.
   */
  limits: shape({
    /**
     * Lowest selectable date based in `moment.js`.
     */
    lower: isMomentPropValidation,
    /**
     * Biggest selectable date based in `moment.js`.
     */
    upper: isMomentPropValidation,
  }),
  /**
   * Triggers when a date is changed or selected.
   * @param {object} value
   */
  onChange: func,
  /**
   * Triggers when DateSelector popover is closed.
   */
  onConfirm: func,
  /**
   * Triggers when selected preset is changed.
  */
  onPresetChange: func,
  /**
   * Date selector presets, used for dates ranges and selection options.
   * @see [DateSelector](#dateselector)
   */
  presets: arrayOf(shape({
    key: string.isRequired,
    label: string.isRequired,
    date: func,
    list: arrayOf(shape({
      key: string.isRequired,
      label: string.isRequired,
      date: func.isRequired,
    })),
  })),
  /**
   * Initial selected preset.
  */
  selectedPreset: string,
  /**
   * Date selection mode to be used initially.
  */
  selectionMode: oneOf(['single', 'period']),
  /**
   * Strings for component i18n.
   */
  strings: shape({
    daySelected: string,
    daysSelected: string,
    end: string,
    select: string,
    start: string,
  }),
  /**
   * Show or hide DateSelector calendar.
  */
  showCalendar: bool,
  /**
   * Show or hide DateSelector sidebar.
  */
  showSidebar: bool,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: shape({
    active: string,
    dateInput: string,
    dateSelector: string,
    end: string,
    error: string,
    focused: string,
    icon: string,
    input: string,
    separator: string,
    start: string,
  }),
}

DateInput.defaultProps = {
  active: false,
  dates: {
    start: null,
    end: null,
  },
  icon: null,
  isValidDay: null,
  limits: {
    lower: moment('1900-01-01', 'YYYY-MM-DD'),
    upper: moment('2100-01-01', 'YYYY-MM-DD'),
  },
  onConfirm: () => null,
  onChange: () => null,
  onPresetChange: () => null,
  presets: [],
  selectedPreset: '',
  selectionMode: 'single',
  showCalendar: true,
  showSidebar: true,
  strings: null,
  theme: {},
}

export default consumeTheme(DateInput)
