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
  textToMoment,
  momentToText,
  hasDifferentEnd,
  clampRange,
  validateRange,
  inputDateMask,
} from './dateHelpers'

import {
  inputClasses,
  startClasses,
  endClasses,
} from './classNames'

const consumeTheme = ThemeConsumer('UIDateInput')

const defaultStrings = {
  start: 'Start',
  end: 'End',
  select: 'Select a date or period',
}

const getStrings = strings => ({
  ...defaultStrings,
  ...strings,
})

/**
 * Input component designed to receive one or two dates, can have a mask
 * for the input and enables the date selection using a calendar like selector.
 * When dates are selected, the first one is the start period and the second is
 * the end one. The date selection callback will always provide two dates, if
 * the component is showing only one date, the callback will receive the same date
 * as start and end.
 */
class DateInput extends React.Component {
  constructor (props) {
    super(props)

    const {
      dates,
    } = props

    this.state = {
      dates: {
        start: null,
        end: null,
      },
      focusedInput: 'startDate',
      showDateSelector: false,
    }

    const { start, end } = momentToText(dates)

    if (dates.start) {
      this.state.dates.start = start
    }

    if (dates.end) {
      this.state.dates.end = end
    }

    this.name = shortid.generate()

    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleDatesChange = this.handleDatesChange.bind(this)
    this.handleSelectorFocus = this.handleSelectorFocus.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)

    this.handleInputFocus = this.handleInputFocus.bind(this)
    this.handleInputBlur = this.handleInputBlur.bind(this)

    this.changeSelectorDisplay = this.changeSelectorDisplay.bind(this)
  }

  componentWillReceiveProps (props) {
    if (props && props.dates) {
      const { dates } = props

      this.setState({
        dates: momentToText(dates),
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
      this.handleConfirm(this.state.dates)
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
    const { value } = event.target
    const { start, end } = this.state.dates

    if (start === end) {
      const dates = {
        start: value,
        end: value,
      }

      this.setState({ dates })
      return
    }

    const inputLens = lensPath(['dates', input])
    const state = set(inputLens, value, this.state)

    this.setState(state)
  }

  handleDatesChange (dates) {
    const { limits } = this.props
    const clampedDates = map(clampRange(limits), dates)

    this.setState({
      dates: clampedDates,
    })
  }

  handleConfirm (dates) {
    const { limits } = this.props
    const momentDates = textToMoment(dates)

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
    const { dates } = this.props
    const textDates = momentToText(dates)

    this.setState({
      dates: textDates,
    }, () => {
      // called in the callback as it will setState again
      this.changeSelectorDisplay(false)
      this.props.onChange(dates)
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
      dates,
      focusedInput,
      showDateSelector,
    } = this.state

    const {
      active,
      icon,
      limits,
      theme,
      strings,
    } = this.props

    const translatedStrings = getStrings(strings)

    const { isValidStart, isValidEnd } = validateRange(limits, dates)
    const isValidDates = isValidStart && isValidEnd
    const momentDates = textToMoment(dates)

    const initialPlaceholder = dates.start || (
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
            mask={inputDateMask}
            size="8"
            onFocus={() => this.handleInputFocus('startDate')}
            onBlur={this.handleInputBlur}
            className={theme.input}
            placeholderChar=" "
            name="startDate"
            onChange={value => this.handleInputChange('start', value)}
            placeholder={initialPlaceholder}
            value={dates.start}
            id={`${this.name}-startDate`}
          />
          <span className={theme.expander}>
            {initialPlaceholder}
          </span>
        </div>

        {hasDifferentEnd(dates) &&
          <div className={theme.separator} />
        }

        {hasDifferentEnd(dates)
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
                mask={inputDateMask}
                size="8"
                onFocus={() => this.handleInputFocus('endDate')}
                onBlur={this.handleInputBlur}
                className={theme.input}
                placeholderChar=" "
                name="endDate"
                onChange={value => this.handleInputChange('end', value)}
                placeholder={translatedStrings.end}
                value={dates.end}
              />
              <span className={theme.expander}>
                {dates.end || 'Fim'}
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
              onChange={this.handleDatesChange}
              onCancel={this.handleCancel}
              onConfirm={this.handleConfirm}
              onFocusChange={this.handleSelectorFocus}
              focusedInput={this.state.focusedInput}
              presets={this.props.presets}
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
   * Enable/disable the component.
   */
  active: bool,
  /**
   * Default start and end dates.
   */
  dates: shape({
    /**
     * Start date based in `moment.js`.
     */
    start: instanceOf(moment),
    /**
     * End date based in `moment.js`.
     */
    end: instanceOf(moment),
  }),
  /**
   * Custom icon which will be shown in the component left side.
   */
  icon: element,
  /**
   * Limit dates for range selections.
   */
  limits: shape({
    /**
     * Biggest selectable date based in `moment.js`.
     */
    upper: instanceOf(moment),
    /**
     * Lowest selectable date based in `moment.js`.
     */
    lower: instanceOf(moment),
  }),
  /**
   * Triggers when a date is changed or selected.
   * @param {object} dates
   */
  onChange: func.isRequired,
  /**
   * Date selector presets, used for dates ranges and selection options.
   * @see [DateSelector](#dateselector)
   */
  presets: arrayOf(shape({
    key: string,
    title: string,
    date: func,
    items: arrayOf(shape({
      title: string,
      date: func,
      key: string,
    })),
  })),
  /**
   * Strings for component i18n.
   */
  strings: shape({
    start: string,
    end: string,
    select: string,
  }),
}

DateInput.defaultProps = {
  theme: {},
  active: false,
  dates: {
    start: null,
    end: null,
  },
  icon: null,
  limits: {
    upper: moment('2100-01-01', 'YYYY-MM-DD'),
    lower: moment('1900-01-01', 'YYYY-MM-DD'),
  },
  presets: [],
  strings: defaultStrings,
}

export default consumeTheme(clickOutside(DateInput))
