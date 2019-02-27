import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  DayPickerRangeController,
  DayPickerSingleDateController,
} from 'react-dates'
import {
  add,
  complement,
  omit,
  times,
} from 'ramda'

import normalizeDates from './normalizeDates'
import ThemeConsumer from '../ThemeConsumer'
import {
  validateDate,
} from '../DateInput/dateHelpers'

const consumeTheme = ThemeConsumer('UICalendar')

const getExtraProps = omit([
  'className',
  'date',
  'dates',
  'dateSelection',
  'daySize',
  'focusedInput',
  'hideKeyboardShortcutsPanel',
  'icons',
  'limits',
  'months',
  'name',
  'navNext',
  'navPrev',
  'numberOfMonths',
  'onChange',
  'onDateChange',
  'onFocusChange',
  'singleDate',
  'theme',
  'value',
])

const START_DATE = 'startDate'

const isOutsideRange = limits => complement(validateDate(limits))

const validateVisibleMonths = (currentMonth, months) =>
  times(add(currentMonth), months)

export const isMomentPropValidation = (props, propName) => {
  const propValue = props[propName]

  if (propValue && !moment.isMoment(propValue)) {
    return new Error(`Prop ${propName} must be an instance of Moment`)
  }

  return null
}

/**
 * Custom calendar based on `react-dates` from airbnb with a simple interface.
 * This component have some special props and the surplus props are passed down to
 * the `react-dates`.
 */
class Calendar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      focusedInput: props.focusedInput || START_DATE,
    }
    this.getVisibleMonths = this.getVisibleMonths.bind(this)
    this.handleDatesChange = this.handleDatesChange.bind(this)
    this.handleFocusChange = this.handleFocusChange.bind(this)
  }

  componentDidUpdate (prevProps, prevState) {
    const { focusedInput } = this.props

    if (focusedInput && focusedInput !== prevState.focusedInput) {
      this.setState({ // eslint-disable-line react/no-did-update-set-state
        focusedInput,
      })
    }
  }

  getVisibleMonths (firstDay) {
    const { months } = this.props
    const currentMonth = firstDay.month()
    return validateVisibleMonths(currentMonth, months)
  }

  handleDatesChange (dates) {
    const normalizedDates = normalizeDates(dates)

    this.props.onChange(normalizedDates)
  }

  handleFocusChange (focusedInput) {
    const {
      onFocusChange,
    } = this.props

    this.setState({
      focusedInput: focusedInput || START_DATE,
    })

    if (onFocusChange) {
      onFocusChange(focusedInput)
    }
  }

  render () {
    const {
      dates,
      icons,
      months,
      dateSelection,
      limits,
    } = this.props
    const { start, end } = dates || {}
    const extraProps = getExtraProps(this.props)

    return (
      <div className="ReactDates-overrides">
        {dateSelection === 'single'
          ? (
            <DayPickerSingleDateController
              {...extraProps}
              date={start}
              daySize={40}
              enableOutsideDays={false}
              focused
              hideKeyboardShortcutsPanel
              isOutsideRange={isOutsideRange(limits)}
              navNext={icons.nextMonth}
              navPrev={icons.previousMonth}
              numberOfMonths={months}
              onDateChange={this.handleDatesChange}
            />
          ) : (
            <DayPickerRangeController
              {...extraProps}
              daySize={40}
              endDate={end}
              focusedInput={this.state.focusedInput}
              hideKeyboardShortcutsPanel
              isOutsideRange={isOutsideRange(limits)}
              navNext={icons.nextMonth}
              navPrev={icons.previousMonth}
              numberOfMonths={months}
              onDatesChange={this.handleDatesChange}
              onFocusChange={this.handleFocusChange}
              startDate={start}
            />
          )
        }
      </div>
    )
  }
}

Calendar.propTypes = {
  /**
   * Selected dates. If the 'dateSelection' prop receives the value 'single',
   * the dates 'start' and 'end' will have the same value.
   */
  dates: PropTypes.shape({
    /**
     * End date based on `moment.js`.
     */
    end: isMomentPropValidation,
    /**
     * Start date based on `moment.js`.
     */
    start: isMomentPropValidation,
  }).isRequired,
  /**
   * This option allows the user to select one date or one priod in the calendar.
   */
  dateSelection: PropTypes.oneOf(['single', 'period']),
  /**
   * Date that will start with focus. It can be 'start' or 'end'.
   * @see (DateRangePicker) [https://github.com/airbnb/react-dates#daterangepicker]
   */
  focusedInput: PropTypes.string,
  /**
   * Default icons used in the month navigation.
   */
  icons: PropTypes.shape({
    nextMonth: PropTypes.element,
    previousMonth: PropTypes.element,
  }),
  /**
   * Limit dates for range selections.
   */
  limits: PropTypes.shape({
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
   * Number of months shown in the calendar.
   */
  months: PropTypes.oneOf([1, 2]),
  /**
   * This function is triggered when either 'dates' or 'presets' are changed,
   * but a state update through 'componentWillReceiveProps'
   * only happens after a change in state. This function is used to send the
   * selected dates to the parent component.
   * @param {object} dates
   */
  onChange: PropTypes.func.isRequired,
  /**
   * This function is triggered when the calendar focus changes between the
   * visible months and when the user clicks outside the calendar.
   * @param {string} focusedInput
   */
  onFocusChange: PropTypes.func,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    actions: PropTypes.string,
    container: PropTypes.string,
    selectedDays: PropTypes.string,
    separator: PropTypes.string,
    sidebar: PropTypes.string,
    stage: PropTypes.string,
  }),
}

Calendar.defaultProps = {
  dateSelection: 'single',
  focusedInput: null,
  icons: {},
  limits: {
    lower: moment('1900-01-01', 'YYYY-MM-DD'),
    upper: moment('2100-01-01', 'YYYY-MM-DD'),
  },
  months: 2,
  onFocusChange: null,
  theme: {},
}

export default consumeTheme(Calendar)
