import React, { Component } from 'react'
import { themr } from 'react-css-themr'
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

import Button from '../Button'
import normalizeDates from './normalizeDates'
import calculatePreset from './calculatePreset'

const START_DATE = 'startDate'
const applyThemr = themr('UIDateSelector')

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

  componentWillReceiveProps (props) {
    if (props && props.dates) {
      const { dates } = props
      if (dates) {
        this.setState({ dates })
      }
    }
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
    return presets.map(({ date, items, key, title }) => {
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
  theme: shape({
    actions: string,
    selectedDays: string,
    separator: string,
    sidebar: string,
    container: string,
    stage: string,
  }),
  onConfirm: func,
  onChange: func,
  onCancel: func,
  onFocusChange: func,
  dates: shape({
    start: oneOfType([momentObj, object]),
    end: oneOfType([momentObj, object]),
  }).isRequired,
  focusedInput: string,
  presets: arrayOf(shape({
    key: string,
    title: string,
    date: string,
    items: arrayOf(shape({
      title: string,
      date: func,
    })),
  })),
  strings: shape({
    cancel: string,
    confirmPeriod: string,
    custom: string,
    days: string,
    daySelected: string,
    daysSelected: string,
    noDayOrPeriodSelected: string,
    period: string,
    today: string,
  }),
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

export default applyThemr(DateSelector)
