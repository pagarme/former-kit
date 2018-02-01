import React, { Component } from 'react'
import {
  func,
  string,
  arrayOf,
  shape,
  oneOfType,
  object,
  element,
} from 'prop-types'
import shortid from 'shortid'
import { momentObj } from 'react-moment-proptypes'
import {
  DayPickerRangeController,
  DayPickerSingleDateController,
} from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'

import ThemeConsumer from '../ThemeConsumer'
import Button from '../Button'
import normalizeDates from './normalizeDates'
import calculatePreset from './calculatePreset'

const START_DATE = 'startDate'
const consumeTheme = ThemeConsumer('UIDateSelector')

const defaultStrings = {
  cancel: 'cancel',
  confirmPeriod: 'confirm period',
  custom: 'custom',
  day: 'day',
  daySelected: 'day selected',
  daysSelected: 'days selected',
  noDayOrPeriodSelected: 'No day or period selected',
  period: 'period',
  today: 'today',
}

/**
 * A calendar like selector based on react-dates
 * which allows the user to select one date
 * or a period(two dates), has a preset list of options for the date
 * selection.
 * Allow the year and months navigation.
 * The day/period selection, cancelation and confirmation fires a set
 * of callbacks which must be given by the father component, the data
 * received in the confirmation callback are the start and end dates,
 * if only one date is selected it will be the start and the end.
 * @see (ReactDates) [https://github.com/airbnb/react-dates]
 */
class DateSelector extends Component {
  constructor (props) {
    super(props)
    this.state = {
      preset: calculatePreset(props.dates),
    }
    this.instanceId = `dateselector-${shortid.generate()}`

    this.getStrings = this.getStrings.bind(this)
    this.handleFocusChange = this.handleFocusChange.bind(this)
    this.handleDatesChange = this.handleDatesChange.bind(this)
    this.handlePresetChange = this.handlePresetChange.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  getStrings () {
    return {
      ...defaultStrings,
      ...this.props.strings,
    }
  }

  handleFocusChange (focusedInput) {
    this.props.onFocusChange(focusedInput || START_DATE)
  }

  handleDatesChange (dates) {
    const normalizedDates = normalizeDates(dates)
    const preset = calculatePreset(dates)
    const state = { preset }

    // Call onChange only after state is set, as calling onChange
    // could trigger a state update via componentWillReceiveProps
    this.setState(state, () => this.props.onChange(normalizedDates))
  }

  handlePresetChange (dates, key) {
    const normalizedDates = normalizeDates(dates, key)
    const state = {
      preset: key,
      dates: normalizedDates,
    }

    // Call onChange only after state is set, as calling onChange
    // could trigger a state update via componentWillReceiveProps
    this.setState(state, () => this.props.onChange(normalizedDates))
  }

  handleCancel () {
    this.props.onCancel()
  }

  handleConfirm () {
    const dates = normalizeDates(this.props.dates)
    this.props.onConfirm(dates)
  }

  renderPreset ({ title, key, date }) {
    const { preset } = this.state
    const group = `${this.instanceId}-presets`
    const selectedId = `${this.instanceId}-preset-${preset}`
    const id = `${this.instanceId}-preset-${key}`

    return (
      <li key={`${key}${title}`}>
        <input
          type="radio"
          name={group}
          id={id}
          onChange={() => this.handlePresetChange(date(), key)}
          checked={selectedId === id}
        />
        <label htmlFor={id}>
          {title}
        </label>
      </li>
    )
  }

  renderPresets (presets) {
    return presets.map(({
      date,
      items,
      key,
      title,
    }) => {
      if (items) {
        return (
          <ol key={`${key}${title}`}>
            <h2>{title}</h2>
            {this.renderPresets(items)}
          </ol>
        )
      }

      return this.renderPreset({
        date,
        title,
        key,
      })
    })
  }

  renderPicker () {
    const { preset } = this.state
    const { focusedInput, icons } = this.props
    const { start, end } = this.props.dates || {}

    return (
      <div className="ReactDates-overrides">
        {['single', 'today'].includes(preset)
          ? (
            <DayPickerSingleDateController
              numberOfMonths={2}
              daySize={40}
              navPrev={icons.previousMonth}
              navNext={icons.nextMonth}
              date={start}
              onDateChange={this.handleDatesChange}
              hideKeyboardShortcutsPanel
            />
          ) : (
            <DayPickerRangeController
              numberOfMonths={2}
              daySize={40}
              focusedInput={focusedInput}
              onFocusChange={this.handleFocusChange}
              navPrev={icons.previousMonth}
              navNext={icons.nextMonth}
              startDate={start}
              endDate={end}
              onDatesChange={this.handleDatesChange}
              hideKeyboardShortcutsPanel
            />
          )
        }
      </div>
    )
  }

  renderActions () {
    const { theme, dates } = this.props
    const { start, end } = dates || {}
    const { preset } = this.state
    const {
      cancel,
      confirmPeriod,
      daySelected,
      daysSelected,
      noDayOrPeriodSelected,
    } = this.getStrings()

    let daysCount = 0

    if (['single', 'today'].includes(preset)) {
      daysCount = 1
    } else if (end) {
      daysCount = end.diff(start, 'days')
    }

    return (
      <div className={theme.actions}>
        <div className={theme.selectedDays}>
          {daysCount === 0 ? noDayOrPeriodSelected : null}
          {daysCount === 1 ? `1 ${daySelected}` : null}
          {daysCount > 1 ? `${daysCount} ${daysSelected}` : null}
        </div>
        <Button
          size="small"
          onClick={this.handleCancel}
          fill="clean"
          type="reset"
          relevance="low"
        >
          {cancel}
        </Button>
        <span className={theme.separator} />
        <Button
          size="small"
          onClick={this.handleConfirm}
          fill="clean"
        >
          {confirmPeriod}
        </Button>
      </div>
    )
  }

  renderSidebar () {
    const {
      custom,
      day,
      period,
      today,
    } = this.getStrings()

    const { theme } = this.props

    return (
      <div className={theme.sidebar}>
        <ol>
          {this.renderPreset({
            key: 'today',
            title: today,
            date: () => 0,
          })}
          {this.renderPresets(this.props.presets)}
          <li>
            <h2>{`${custom}:`}</h2>
            <ol>
              {this.renderPreset({
                key: 'single',
                title: day,
                date: () => -1,
              })}
              {this.renderPreset({
                key: 'range',
                title: period,
                date: () => -3,
              })}
            </ol>
          </li>
        </ol>
      </div>
    )
  }

  render () {
    const { theme } = this.props

    return (
      <div className={theme.container}>
        {this.renderSidebar()}
        <div className={theme.stage}>
          {this.renderPicker()}
          {this.renderActions()}
        </div>
      </div>
    )
  }
}

DateSelector.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from consumeTheme wrapper
   */
  theme: shape({
    actions: string,
    selectedDays: string,
    separator: string,
    sidebar: string,
    container: string,
    stage: string,
  }),
  /**
   * Trigged when the confirmarion button is clicked
   * @param {object} dates
   */
  onConfirm: func,
  /**
   * This functions is trigged when dates or presets are changed,
   * but only after the state was changed, could trigger a state
   * update via componentWillReceiveProps.
   * It's function is used to send the selected dates to the father component.
   * @param {object} dates
   */
  onChange: func,
  /**
   * Trigger when the cancel button is clicked, stops the dates selection and
   * fires the given callback without params,
   * the calback should close the selector
   */
  onCancel: func,
  /**
   *
   */
  onFocusChange: func,
  /**
   * Selected dates
   */
  dates: shape({
    /**
     * Start date based on moment.js
     */
    start: oneOfType([momentObj, object]),
    /**
     * End date based on moment.js
     */
    end: oneOfType([momentObj, object]),
  }).isRequired,
  /**
   * Date which will start with focus, can be start or end
   * @see (DateRangePicker) [https://github.com/airbnb/react-dates#daterangepicker]
   */
  focusedInput: string,
  /**
   * Props structure which is used to create the left side menu, this menu allows
   * the user to select dates in preset dates, ranges, etc.
   */
  presets: arrayOf(shape({
    /**
     * Preset identification
     */
    key: string,
    /**
     * Item text which will be shown in the list
     */
    title: string,
    /**
     * Item evaluation function
     */
    date: func,
    /**
     * This items are used to create a sub-menu under the title of
     * the current item
     */
    items: arrayOf(shape({
      /**
       * Item text which will be shown in the list
       */
      title: string,
      /**
       * Item evaluation function
       */
      date: func,
    })),
  })),
  /**
   * Texts used in the component internationalization(i18n)
   */
  strings: shape({
    /**
     * Cancel button text
     */
    cancel: string,
    /**
     * Confirm button text
     */
    confirmPeriod: string,
    /**
     * Custom presets subtitle
     */
    custom: string,
    /**
     * Day label
     */
    days: string,
    /**
     * Selected day label
     */
    daySelected: string,
    /**
     * Selected days label
     */
    daysSelected: string,
    /**
     * No selected day/period label
     */
    noDayOrPeriodSelected: string,
    /**
     * Period label
     */
    period: string,
    /**
     * Today label
     */
    today: string,
  }),
  /**
   * Default icons used in the month navigation
   */
  icons: shape({
    previousMonth: element,
    nextMonth: element,
  }),
}

DateSelector.defaultProps = {
  theme: {},
  focusedInput: START_DATE,
  icons: {},
  onCancel: () => undefined,
  onChange: () => undefined,
  onConfirm: () => undefined,
  onFocusChange: () => undefined,
  presets: [],
  strings: defaultStrings,
}

export default consumeTheme(DateSelector)
