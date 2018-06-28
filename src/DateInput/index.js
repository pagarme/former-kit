import React from 'react'
import shortid from 'shortid'
import {
  isNil,
  lensPath,
  map,
  set,
} from 'ramda'

import {
  arrayOf,
  bool,
  element,
  func,
  instanceOf,
  shape,
  string,
} from 'prop-types'

import moment from 'moment'
import MaskedInput from 'react-maskedinput'
import clickOutside from 'react-click-outside'

import ThemeConsumer from '../ThemeConsumer'
import DateSelector from '../DateSelector'

import {
  clampRange,
  hasDifferentEnd,
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
  anyDate: 'Any Date',
  cancel: 'cancel',
  confirmPeriod: 'confirm period',
  custom: 'custom',
  day: 'day',
  daySelected: 'day selected',
  daysSelected: 'days selected',
  end: 'End',
  noDayOrPeriodSelected: 'No day or period selected',
  period: 'period',
  select: 'Select a date or period',
  start: 'Start',
  today: 'today',
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

    const {
      value,
    } = props

    this.state = {
      focusedInput: 'startDate',
      showDateSelector: false,
      value: {
        end: null,
        start: null,
      },
    }

    const { start, end } = momentToText(value)

    if (value.start) {
      this.state.value.start = start
    }

    if (value.end) {
      this.state.value.end = end
    }

    this.name = shortid.generate()

    this.changeSelectorDisplay = this.changeSelectorDisplay.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleDatesChange = this.handleDatesChange.bind(this)
    this.handleInputBlur = this.handleInputBlur.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputFocus = this.handleInputFocus.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleSelectorFocus = this.handleSelectorFocus.bind(this)
  }

  componentWillReceiveProps (props) {
    if (props && props.value) {
      const { value } = props

      this.setState({
        value: momentToText(value),
      })
    }
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyDown, true)
  }

  handleClickOutside () {
    if (this.state.showDateSelector) {
      this.handleCancel()
    }
  }

  handleKeyDown (event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.handleConfirm(this.state.value)
      return
    }

    if (event.key === 'Escape') {
      this.handleCancel()
    }
  }

  changeSelectorDisplay (showDateSelector, focusedInput) {
    if (!showDateSelector) {
      document.removeEventListener('keydown', this.handleKeyDown, true)
    }
    this.setState({ showDateSelector, focusedInput })
  }

  handleInputChange (input, event) {
    const { value: evtValue } = event.target
    const { end, start } = this.state.value

    if (start === end) {
      const value = {
        end: evtValue,
        start: evtValue,
      }

      this.setState({ value })
      return
    }

    const inputLens = lensPath(['value', input])
    const state = set(inputLens, evtValue, this.state)

    this.setState(state)
  }

  handleDatesChange (value) {
    const { limits } = this.props
    const clampedDates = map(clampRange(limits), value)

    this.setState({
      value: clampedDates,
    })
  }

  handleConfirm (value) {
    const { limits } = this.props
    const momentDates = textToMoment(value)

    const {
      isValidStart,
      isValidEnd,
    } = validateRange(limits, momentDates)

    if (!isValidStart || !isValidEnd) {
      return
    }

    this.changeSelectorDisplay(false)
    this.props.onChange(momentDates)
  }

  handleCancel () {
    const { value } = this.props
    const textDates = momentToText(value)

    this.setState({
      value: textDates,
    }, () => {
      // called in the callback as it will setState again
      this.changeSelectorDisplay(false)
      this.props.onChange(value)
    })
  }

  handleInputFocus (focusedInput) {
    document.addEventListener('keydown', this.handleKeyDown, true)
    this.changeSelectorDisplay(true, focusedInput)
  }

  handleInputBlur () {
    if (!this.state.showDateSelector) {
      document.removeEventListener('keydown', this.handleKeyDown, true)
    }
  }

  handleSelectorFocus (focusedInput) {
    this.setState({ focusedInput })
  }

  render () {
    const {
      focusedInput,
      showDateSelector,
      value,
    } = this.state

    const {
      active,
      icon,
      limits,
      theme,
      strings,
    } = this.props

    const translatedStrings = getStrings(strings)

    const { isValidStart, isValidEnd } = validateRange(limits, value)
    const isValidDates = isValidStart && isValidEnd
    const momentDates = textToMoment(value)

    const initialPlaceholder = value.start || (
      showDateSelector
        ? translatedStrings.start
        : translatedStrings.select
    )

    return (
      <div
        className={inputClasses({
          theme,
          active,
          error: !isValidDates,
          focused: showDateSelector,
        })}
      >
        {!isNil(icon) && (
          <div className={theme.icon}>
            {icon}
          </div>
        )}
        <div
          className={startClasses({
            theme,
            showDateSelector,
            focusedInput,
            isValid: isValidStart,
          })}
        >
          <MaskedInput
            autoComplete="off"
            className={theme.input}
            id={`${this.name}-startDate`}
            mask={inputDateMask}
            name="startDate"
            onBlur={this.handleInputBlur}
            onChange={val => this.handleInputChange('start', val)}
            onFocus={() => this.handleInputFocus('startDate')}
            placeholder={initialPlaceholder}
            placeholderChar=" "
            size="8"
            value={value.start}
          />
          <span className={theme.expander}>
            {initialPlaceholder}
          </span>
        </div>

        {hasDifferentEnd(value) &&
          <div className={theme.separator} />
        }

        {hasDifferentEnd(value)
          ? (
            <div
              className={endClasses({
                theme,
                showDateSelector,
                focusedInput,
                isValid: isValidEnd,
              })}
            >
              <MaskedInput
                autoComplete="off"
                className={theme.input}
                mask={inputDateMask}
                name="endDate"
                onBlur={this.handleInputBlur}
                onChange={val => this.handleInputChange('end', val)}
                onFocus={() => this.handleInputFocus('endDate')}
                placeholder={translatedStrings.end}
                placeholderChar=" "
                size="8"
                value={value.end}
              />
              <span className={theme.expander}>
                {value.end || translatedStrings.end}
              </span>
            </div>
          ) : (
            null
          )
        }

        {showDateSelector ?
          <div className={theme.dateSelector}>
            <DateSelector
              dates={isValidDates ? momentDates : {}}
              focusedInput={this.state.focusedInput}
              onCancel={this.handleCancel}
              onChange={this.handleDatesChange}
              onConfirm={this.handleConfirm}
              onFocusChange={this.handleSelectorFocus}
              presets={this.props.presets}
              strings={strings}
            />
          </div>
          : null
        }
      </div>
    )
  }
}

DateInput.propTypes = {
  /**
   * Enable/disable the component.
   */
  active: bool,
  /**
   * Custom icon which will be shown in the component left side.
   */
  icon: element,
  /**
   * Limit dates for range selections.
   */
  limits: shape({
    /**
     * Lowest selectable date based in `moment.js`.
     */
    lower: instanceOf(moment),
    /**
     * Biggest selectable date based in `moment.js`.
     */
    upper: instanceOf(moment),
  }),
  /**
   * Triggers when a date is changed or selected.
   * @param {object} value
   */
  onChange: func.isRequired,
  /**
   * Date selector presets, used for dates ranges and selection options.
   * @see [DateSelector](#dateselector)
   */
  presets: arrayOf(shape({
    date: func,
    items: arrayOf(shape({
      date: func,
      key: string,
      title: string,
    })),
    key: string,
    title: string,
  })),
  /**
   * Strings for component i18n.
   */
  strings: shape({
    anyDate: string,
    cancel: string,
    confirmPeriod: string,
    custom: string,
    day: string,
    daySelected: string,
    daysSelected: string,
    end: string,
    noDayOrPeriodSelected: string,
    period: string,
    select: string,
    start: string,
    today: string,
  }),
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
  /**
   * Default start and end dates.
   */
  value: shape({
    /**
     * End date based in `moment.js`.
     */
    end: instanceOf(moment),
    /**
     * Start date based in `moment.js`.
     */
    start: instanceOf(moment),
  }),
}

DateInput.defaultProps = {
  active: false,
  icon: null,
  limits: {
    lower: moment('1900-01-01', 'YYYY-MM-DD'),
    upper: moment('2100-01-01', 'YYYY-MM-DD'),
  },
  presets: [],
  strings: defaultStrings,
  theme: {},
  value: {
    end: null,
    start: null,
  },
}

export default consumeTheme(clickOutside(DateInput))
