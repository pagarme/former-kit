import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import React, { Component } from 'react'
import {
  bool,
  func,
  string,
  arrayOf,
  shape,
  oneOf,
  element,
} from 'prop-types'
import shortid from 'shortid'
import {
  defaultTo,
  flatten,
  has,
  identity,
  ifElse,
  isNil,
  map,
  pipe,
  prop,
} from 'ramda'
import moment from 'moment'

import ThemeConsumer from '../ThemeConsumer'
import normalizeDates from './normalizeDates'

import {
  Popover,
} from '../Popover'
import Calendar from '../Calendar'
import isMomentPropValidation from '../validations'
import Aside from './Aside'

const consumeTheme = ThemeConsumer('UIDateSelector')

const defaultStrings = {
  daySelected: 'day selected',
  daysSelected: 'days selected',
}

const diffInDays = (leftDate, rightDate) => (
  leftDate
  && rightDate
  && leftDate.diff(rightDate, 'days') + 1
)

const flattenPresets = pipe(
  map(
    pipe(
      ifElse(
        has('list'),
        pipe(
          prop('list'),
          defaultTo([])
        ),
        identity
      )
    )
  ),
  flatten
)

export const getPreset = (presetName, presets) => {
  const flattenedPresets = flattenPresets(presets)
  const foundPreset = flattenedPresets
    .find(preset => preset.key === presetName)

  return foundPreset
}

export const getPresetLimits = (range) => {
  // TODO: refactor range logic be based on
  // selected date instead of current date

  let start = null
  let end = null

  if (range < 0) {
    start = moment().add(range, 'days').startOf('day')
    end = moment().endOf('day')
  } else if (range > 0) {
    start = moment().startOf('day')
    end = moment().add(range, 'days').endOf('day')
  } else if (range === 0) {
    start = moment().startOf('day')
    end = moment().endOf('day')
  }

  return {
    start,
    end,
  }
}

const isDateBetweenRange = (date, range) =>
  date.isBetween(range.start, range.end, 'day', '[]')

const isDayBlocked = (date, presetRange, { start, end }) =>
  !isNil(presetRange) && !isDateBetweenRange(date, { start, end })

/**
 * A calendarlike selector based on react-dates
 * which allows the user to select one date
 * or a period (two dates), has a preset list of options for the date
 * selection.
 * Allow the year and months navigation.
 * The day/period selection, cancelation and confirmation fires a set
 * of callbacks which must be given by the parent component, the data
 * received in the confirmation callback are the start and end dates,
 * if only one date is selected it will be the start and the end.
 * @see (ReactDates) [https://github.com/airbnb/react-dates]
 */
class DateSelector extends Component {
  constructor (props) {
    super(props)

    this.instanceId = `dateselector-${shortid.generate()}`

    this.state = {
      visible: !!props.visible,
    }

    this.getStrings = this.getStrings.bind(this)
    this.handlePresetChange = this.handlePresetChange.bind(this)
    this.handlePopoverClose = this.handlePopoverClose.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  componentDidUpdate (prevProps, prevState) {
    const { visible } = this.props

    if (visible !== prevState.visible) {
      this.setState({ // eslint-disable-line react/no-did-update-set-state
        visible,
      })
    }
  }

  getStrings () {
    return {
      ...defaultStrings,
      ...this.props.strings,
    }
  }

  handleOnChange (dates) {
    const {
      selectedPreset,
      onChange,
      presets,
    } = this.props

    const preset = getPreset(selectedPreset, presets)

    if (!selectedPreset || isNil(preset.date())) {
      onChange(normalizeDates(dates))
    }
  }

  handlePresetChange (dates, selectedPreset) {
    const {
      onChange,
      onPresetChange,
      presets,
    } = this.props

    const presetObject = getPreset(selectedPreset, presets)
    const presetRange = getPresetLimits(dates)

    onPresetChange(presetRange, presetObject)
    onChange(presetRange)
  }

  handlePopoverClose () {
    const {
      dates,
      onConfirm,
      presets,
      selectedPreset,
    } = this.props

    if (this.state.visible) {
      if (selectedPreset) {
        const currentPreset = getPreset(selectedPreset, presets)
        onConfirm(getPresetLimits(currentPreset.date()))
      } else {
        onConfirm(dates)
      }

      this.setState({
        visible: false,
      })
    }
  }

  renderPicker () {
    const {
      dates,
      focusedInput,
      icons,
      isValidDay,
      presets,
      selectedPreset,
      selectionMode,
    } = this.props

    const currentPreset = getPreset(selectedPreset, presets)
    const presetRange = currentPreset ? currentPreset.date() : null

    const presetLimits = !isNil(presetRange)
      ? getPresetLimits(presetRange)
      : dates

    const dateSelectionMode = currentPreset ? currentPreset.mode : selectionMode

    return (
      <div className="ReactDates-overrides">
        <Calendar
          numberOfMonths={2}
          daySize={40}
          isDayBlocked={date =>
            (isValidDay && !isValidDay(date))
            || isDayBlocked(date, presetRange, presetLimits)
          }
          navPrev={icons.previousMonth}
          navNext={icons.nextMonth}
          dates={{
            start: presetLimits.start,
            end: presetLimits.end,
          }}
          dateSelection={dateSelectionMode}
          focusedInput={focusedInput}
          onChange={this.handleOnChange}
        />
      </div>
    )
  }

  renderActions () {
    const {
      dates,
      theme,
    } = this.props

    const { start, end } = dates || {}
    const {
      daySelected,
      daysSelected,
    } = this.getStrings()

    const daysCount = diffInDays(end, start)

    return (
      <div className={theme.actions}>
        <div className={theme.selectedDays}>
          {daysCount === 1 ? `1 ${daySelected}` : null}
          {daysCount > 1 ? `${daysCount} ${daysSelected}` : null}
        </div>
      </div>
    )
  }

  render () {
    const {
      children,
      presets,
      selectedPreset,
      showCalendar,
      showSidebar,
      theme,
    } = this.props

    return (
      <div className={theme.dateselector}>
        <Popover
          content={
            <div className={theme.container}>
              { showSidebar &&
                <div className={theme.sidebar}>
                  <Aside
                    presets={presets}
                    selectedPreset={selectedPreset}
                    name={this.instanceId}
                    onChange={this.handlePresetChange}
                  />
                </div>
              }
              { showCalendar &&
                <div className={theme.stage}>
                  {this.renderPicker()}
                  {this.renderActions()}
                </div>
              }
            </div>
          }
          onClick={() => null}
          onClickOutside={this.handlePopoverClose}
          visible={this.state.visible}
        >
          {children}
        </Popover>
      </div>
    )
  }
}

DateSelector.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: shape({
    actions: string,
    container: string,
    selectedDays: string,
    sidebar: string,
    stage: string,
  }),
  /**
   * This function is trigged when dates are changed,
   * but only after the state was changed, could trigger a state
   * update via `componentWillReceiveProps`.
   * Its function is used to send the selected dates to the parent component.
   * @param {object} dates
   */
  onChange: func.isRequired,
  /**
   * Triggered when a preset is selected.
   */
  onPresetChange: func,
  /*
   * Triggered when popover closes.
   */
  onConfirm: func.isRequired,
  /**
   *
   */
  children: element.isRequired,
  /**
   * Selected dates.
   */
  dates: shape({
    /**
     * Start date based on `moment.js`.
     */
    start: isMomentPropValidation,
    /**
     * End date based on `moment.js`.
     */
    end: isMomentPropValidation,
  }),
  /**
   * Default icons used in the month navigation.
   */
  icons: shape({
    previousMonth: element,
    nextMonth: element,
  }),
  /**
   * Function that returns a boolean wheter the date is valid
   */
  isValidDay: func,
  /**
   * Mode to be used when showSidebar is false.
  */
  selectionMode: (props, propName) => {
    if (props.showSidebar && !props[propName]) {
      return new Error(
        `${propName} must be 'single' or 'period' when showSidebar is true.`
      )
    }

    return null
  },
  /**
   * Props structure which is used to create the left side menu, this menu allows
   * the user to select dates in preset dates, ranges, etc.
   */
  presets: arrayOf(shape({
    /**
     * Preset/Preset Group identification.
     */
    key: string.isRequired,
    /**
     * Item text which will be shown in the list.
     */
    label: string.isRequired,
    /**
     * Item evaluation function.
     */
    date: func,
    /**
     * This items are used to create a sub-menu under the title of
     * the current item. When this is specified, date prop will not be used.
     */
    items: arrayOf(shape({
      /**
       * Preset identification.
       */
      key: string.isRequired,
      /**
       * Item text which will be shown in the list.
       */
      label: string.isRequired,
      /**
       * Item evaluation function.
       */
      date: func,
    })),
  })),
  /**
   * The key of the selected preset.
   */
  selectedPreset: string,
  /**
   * Texts used in the component internationalization (i18n).
   */
  strings: shape({
    daySelected: string,
    /**
     * Selected days label.
     */
    daysSelected: string,
  }),
  /**
   * Indicates if calendar should be visible.
   */
  showCalendar: bool,
  /**
   * Indicates if sidebar should be visible.
   */
  showSidebar: bool,
  /**
   * Indicates if popover should be visible.
   */
  visible: bool,
  /**
   * The date that will be set on next
   * click on calendar
  */
  focusedInput: oneOf(['startDate', 'endDate']),
}

DateSelector.defaultProps = {
  dates: {},
  selectedPreset: '',
  focusedInput: null,
  icons: {},
  isValidDay: null,
  selectionMode: 'single',
  onPresetChange: () => undefined,
  presets: [],
  showCalendar: true,
  showSidebar: true,
  visible: false,
  strings: defaultStrings,
  theme: {},
}

export default consumeTheme(DateSelector)
