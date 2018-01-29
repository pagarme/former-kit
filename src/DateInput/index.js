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
  node,
  shape,
  string,
} from 'prop-types'

import moment from 'moment'
import MaskedInput from 'react-maskedinput'
import clickOutside from 'react-click-outside'
import { themr } from 'react-css-themr'

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

const applyThemr = themr('UIDateInput')

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
      selectorIcons,
      theme,
    } = this.props

    const { isValidStart, isValidEnd } = validateRange(limits, dates)
    const isValidDates = isValidStart && isValidEnd
    const momentDates = textToMoment(dates)

    const initialPlaceholder = dates.start || (
      showDateSelector
        ? 'Inicio'
        : 'Selecione uma data ou periodo'
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
                placeholder="Fim"
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
              icons={selectorIcons}
            />
          </div>
          : null
        }
      </div>
    )
  }
}

DateInput.propTypes = {
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
  active: bool,
  dates: shape({
    start: instanceOf(moment),
    end: instanceOf(moment),
  }),
  icon: node,
  limits: shape({
    upper: instanceOf(moment),
    lower: instanceOf(moment),
  }),
  onChange: func.isRequired,
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
  selectorIcons: shape({
    leftArrow: element,
    rightArrow: element,
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
  selectorIcons: {},
  limits: {
    upper: moment('2100-01-01', 'YYYY-MM-DD'),
    lower: moment('1900-01-01', 'YYYY-MM-DD'),
  },
  presets: [],
}

export default applyThemr(clickOutside(DateInput))
