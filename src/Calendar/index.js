import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  DayPickerRangeController,
  DayPickerSingleDateController,
} from 'react-dates'
import { omit } from 'ramda'
import ThemeConsumer from '../ThemeConsumer'
import normalizeDates from './normalizeDates'

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

    this.handleDatesChange = this.handleDatesChange.bind(this)
    this.handleFocusChange = this.handleFocusChange.bind(this)
  }

  handleDatesChange (dates) {
    const normalizedDates = normalizeDates(dates)
    this.props.onChange(normalizedDates)
  }

  handleFocusChange (focusedInput) {
    this.setState({
      focusedInput: focusedInput || START_DATE,
    })
  }

  render () {
    const {
      dates,
      icons,
      months,
      dateSelection,
    } = this.props
    const { start, end } = dates || {}
    const extraProps = getExtraProps(this.props)

    return (
      <div className="ReactDates-overrides">
        {dateSelection === 'single'
          ? (
            <DayPickerSingleDateController
              {...extraProps}
              numberOfMonths={months}
              daySize={40}
              navPrev={icons.previousMonth}
              navNext={icons.nextMonth}
              date={start}
              onDateChange={this.handleDatesChange}
              hideKeyboardShortcutsPanel
            />
          ) : (
            <DayPickerRangeController
              {...extraProps}
              numberOfMonths={months}
              daySize={40}
              focusedInput={this.state.focusedInput}
              navPrev={icons.previousMonth}
              navNext={icons.nextMonth}
              startDate={start}
              endDate={end}
              onDatesChange={this.handleDatesChange}
              onFocusChange={this.handleFocusChange}
              hideKeyboardShortcutsPanel
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
    end: PropTypes.instanceOf(moment),
    /**
     * Start date based on `moment.js`.
     */
    start: PropTypes.instanceOf(moment),
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
  focusedInput: START_DATE,
  icons: {},
  months: 2,
  theme: {},
}

export default consumeTheme(Calendar)
