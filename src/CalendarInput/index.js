import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import shortid from 'shortid'
import {
  always,
  complement,
  equals,
  isNil,
  lensPath,
  set,
} from 'ramda'
import MaskedInput from 'react-maskedinput'

import {
  inputDateMask,
  isValidMoment,
  momentToText,
  textToMoment,
} from '../DateInput/dateHelpers'
import {
  endClasses,
  inputClasses,
  startClasses,
} from '../DateInput/classNames'
import ThemeConsumer from '../ThemeConsumer'
import { Popover } from '../Popover'
import Calendar from '../Calendar'

const consumeTheme = ThemeConsumer('UIDateInput')
const PERIOD_SELECTION = 'period'
const SINGLE_SELECTION = 'single'

const isPeriodSelection = equals(PERIOD_SELECTION)

/**
 * This component is a simplified version of the date selector only with the basic
 * and the calendar inputs.
 * The input component designed to receive one or two dates, have a date format mask
 * for the input and enables the date selection using a calendarlike selector.
 * When dates are selected, the first one is the start period and the second is
 * the end one. The date selection callback will always provide two dates, if
 * the component is showing only one date, the callback will receive the same date
 * as start and end.
 * @deprecated CalendarInput component is being deprecated, use DateInput with
 * showCalendar prop as "false" instead.
 */
class CalendarInput extends Component {
  constructor (props) {
    if (process.env.NODE_ENV !== 'test') {
      // eslint-disable-next-line no-console
      console.warn(
        'CalendarInput component is being deprecated, use DateInput with showSidebar prop as "false" instead.'
      )
    }

    super(props)
    const { start, end } = props.value
    const isValidStart = (!start && !isPeriodSelection(props.dateSelection))
    || isValidMoment(start)

    const validStart = isValidStart ? start : moment()
    const swapDates = isValidMoment(end) && end.isBefore(validStart)

    this.state = {
      focusedInput: null,
      value: momentToText({
        start: swapDates ? end : validStart,
        end: swapDates ? validStart : end,
      }),
    }
    this.name = shortid.generate()

    this.changeSelectorDisplay = this.changeSelectorDisplay.bind(this)
    this.getDayBlockedValidation = this.getDayBlockedValidation.bind(this)
    this.getValidMomentDates = this.getValidMomentDates.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleDatesChange = this.handleDatesChange.bind(this)
    this.handleExit = this.handleExit.bind(this)
    this.handleInputBlur = this.handleInputBlur.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputFocus = this.handleInputFocus.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleSelectorFocus = this.handleSelectorFocus.bind(this)
    this.isValidDate = this.isValidDate.bind(this)
    this.isValidPeriod = this.isValidPeriod.bind(this)
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

  getDayBlockedValidation () {
    const { isValidDay } = this.props
    return isValidDay ? complement(isValidDay) : always(false)
  }

  getValidMomentDates () {
    const { value } = this.state
    const { end, start } = textToMoment(value)

    return {
      end: isValidMoment(end) ? end : null,
      start: isValidMoment(start) ? start : null,
    }
  }

  getStartPlaceHolder () {
    const { strings, dateSelection } = this.props
    const {
      value: {
        start,
      },
    } = this.state

    if (!start || start === 'invalid date') {
      if (isPeriodSelection(dateSelection)) {
        return strings.start
      }
      return strings.select
    }

    return start
  }

  handleConfirm (value) {
    const dates = value || this.state.value
    const { start, end } = textToMoment(dates)
    const { dateSelection, onChange } = this.props
    const validEnd = !end || isValidMoment(end)
    const emptyDates = (!start && !end)
      || (!start && !isPeriodSelection(dateSelection))

    if (emptyDates) {
      return onChange({
        end: null,
        start: null,
      })
    }
    if (start.isValid() && validEnd) {
      if (end && start.isAfter(end)) {
        return onChange({
          end: start,
          start: end,
        })
      }
      return onChange({
        end,
        start,
      })
    }

    return undefined
  }

  handleDatesChange ({ start, end }) {
    const isValid = this.isValidDate(start) && this.isValidDate(end)
    const {
      closeOnSelect,
      dateSelection,
      onChange,
    } = this.props
    const showDateSelector = !(
      !isPeriodSelection(dateSelection)
      && closeOnSelect
      && this.state.showDateSelector
    )
    if (isValid) {
      this.setState({
        value: momentToText({ start, end }),
        showDateSelector,
      })
      onChange({ start, end })
      this.handleInputBlur()
    }
  }

  handleExit () {
    this.setState({
      focusedInput: null,
      showDateSelector: false,
    })
    document.removeEventListener('keydown', this.handleKeyDown, true)
  }

  handleInputChange (input, event) {
    const { value: evtValue } = event.target
    const { end, start } = this.state.value

    if (start === end) {
      const value = {
        end: evtValue,
        start: evtValue,
      }

      this.setState(
        { value },
        this.handleConfirm
      )
      return
    }
    const inputLens = lensPath(['value', input])
    const state = set(inputLens, evtValue, this.state)

    this.setState(
      state,
      this.handleConfirm
    )
  }

  handleKeyDown (event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.changeSelectorDisplay(false)
      this.handleConfirm(this.state.value)
      return
    }

    if (event.key === 'Escape') {
      this.handleExit()
    }
  }

  handleInputBlur () {
    if (!this.state.showDateSelector) {
      document.removeEventListener('keydown', this.handleKeyDown, true)
    }
  }

  handleInputFocus (focusedInput) {
    if (!this.state.showDateSelector) {
      document.addEventListener('keydown', this.handleKeyDown, true)
    }
    this.changeSelectorDisplay(true, focusedInput)
  }

  handleSelectorFocus (focusedInput) {
    this.setState({
      focusedInput: focusedInput || 'startDate',
    })
  }

  changeSelectorDisplay (showDateSelector, focusedInput) {
    if (!showDateSelector) {
      document.removeEventListener('keydown', this.handleKeyDown, true)
    }
    this.setState({
      focusedInput,
      showDateSelector,
    })
  }

  isValidDate (date) {
    const { isValidDay } = this.props
    const isValid = isValidDay ? isValidDay(moment(date, 'L')) : true

    return !date || (isValid && date)
  }

  isValidPeriod ({ end, start }) {
    const { dateSelection } = this.props
    if (
      !isPeriodSelection(dateSelection)
      || (start && !start.isSameOrAfter(end, 'day'))
    ) {
      return true
    }
    return false
  }

  render () {
    const {
      focusedInput,
      showDateSelector,
      value: {
        end,
        start,
      },
    } = this.state

    const {
      dateSelection,
      disabled,
      icon,
      months,
      theme,
      strings,
    } = this.props
    const momentDates = this.getValidMomentDates()
    const isValidPeriod = this.isValidPeriod(momentDates)
    const validStart = this.isValidDate(start)
    const validEnd = this.isValidDate(end) && isValidPeriod
    const isValid = validStart && validEnd && isValidPeriod
    const focused = !!focusedInput
    const active = !disabled && focused
    const startPlaceHolder = this.getStartPlaceHolder()

    return (
      <Popover
        visible={showDateSelector}
        onClick={() => undefined}
        onClickOutside={this.handleExit}
        content={
          <Calendar
            dates={momentDates}
            dateSelection={dateSelection}
            focusedInput={focusedInput}
            months={months}
            onChange={this.handleDatesChange}
            onFocusChange={this.handleSelectorFocus}
            isDayBlocked={this.getDayBlockedValidation()}
          />
        }
      >
        <div
          className={inputClasses({
            theme,
            active,
            error: !isValid,
            focused,
          })}
        >
          {!isNil(icon) && (
            <div className={theme.icon}>
              {icon}
            </div>
          )}
          <div
            className={startClasses({
              focusedInput,
              isValid: validStart,
              theme,
            })}
          >
            <MaskedInput
              autoComplete="off"
              className={theme.input}
              disabled={disabled}
              id={`${this.name}-startDate`}
              mask={inputDateMask()}
              name="startDate"
              onBlur={this.handleInputBlur}
              onChange={val => this.handleInputChange('start', val)}
              onFocus={() => this.handleInputFocus('startDate')}
              placeholder={startPlaceHolder}
              placeholderChar=" "
              size="8"
              value={start}
            />
            <span className={theme.expander}>
              {startPlaceHolder}
            </span>
          </div>
          {isPeriodSelection(dateSelection) &&
            <Fragment>
              <div className={theme.separator} />
              <div
                className={endClasses({
                  focusedInput,
                  isValid: validEnd,
                  theme,
                })}
              >
                <MaskedInput
                  autoComplete="off"
                  className={theme.input}
                  mask={inputDateMask()}
                  name="endDate"
                  onBlur={this.handleInputBlur}
                  onChange={val => this.handleInputChange('end', val)}
                  onFocus={() => this.handleInputFocus('endDate')}
                  placeholder={strings.end}
                  placeholderChar=" "
                  size="8"
                  value={end}
                />
                <span className={theme.expander}>
                  {end || strings.end}
                </span>
              </div>
            </Fragment>
          }
        </div>
      </Popover>
    )
  }
}

CalendarInput.propTypes = {
  /**
   * This functions allows the component to close automatically the calendar
   * when a date is selected, this option only works if the 'dateSelection' prop
   * is 'single'.
   */
  closeOnSelect: PropTypes.bool,
  /**
   * This option allows the user to select one date or one priod in the calendar.
   */
  dateSelection: PropTypes.oneOf([SINGLE_SELECTION, PERIOD_SELECTION]),
  /**
   * Enable/disable the component.
   */
  disabled: PropTypes.bool,
  /**
   * Custom icon which will be shown in the component left side.
   */
  icon: PropTypes.element,
  /**
   *
   */
  isValidDay: PropTypes.func,
  /**
   * Number of months shown in the calendar.
   */
  months: PropTypes.oneOf([1, 2]),
  /**
   * Triggers when a date is changed or selected.
   * @param {object} value
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Strings for component i18n.
   */
  strings: PropTypes.shape({
    end: PropTypes.string,
    select: PropTypes.string,
    start: PropTypes.string,
  }),
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    active: PropTypes.string,
    dateInput: PropTypes.string,
    dateSelector: PropTypes.string,
    end: PropTypes.string,
    error: PropTypes.string,
    focused: PropTypes.string,
    icon: PropTypes.string,
    input: PropTypes.string,
    separator: PropTypes.string,
    start: PropTypes.string,
  }),
  /**
   * Default start and end dates.
   */
  value: PropTypes.shape({
    /**
     * End date based in `moment.js`.
     */
    end: PropTypes.instanceOf(moment),
    /**
     * Start date based in `moment.js`.
     */
    start: PropTypes.instanceOf(moment),
  }),
}

CalendarInput.defaultProps = {
  closeOnSelect: true,
  dateSelection: SINGLE_SELECTION,
  disabled: false,
  icon: null,
  isValidDay: null,
  months: 1,
  strings: {},
  theme: {},
  value: {
    end: null,
    start: null,
  },
}

export default consumeTheme(CalendarInput)
