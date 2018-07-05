import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { complement, contains } from 'ramda'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import IconCalendar from 'emblematic-icons/svg/Calendar32.svg'
import Section from '../Section'
import CalendarInput from '../../src/CalendarInput'
import style from './style.css'

const isWeekendDay = date =>
  date && date.weekday && contains(date.weekday(), [0, 6])

const isWeekDay = complement(isWeekendDay)

const isValidDay = (date) => {
  if (date && date.isValid()) {
    return isWeekDay(date)
  }
  return false
}

const defaultValidDates = {
  end: moment('2018-07-05'),
  start: moment('2018-07-06'),
}

const weekendDates = {
  end: moment('2018-07-07'),
  start: moment('2018-07-08'),
}

class CalendarInputState extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value,
    }
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  handleDateChange (value) {
    this.setState({ value })
    action('change')(value)
  }

  render () {
    const {
      months,
      selection,
      sectionTitle,
    } = this.props
    return (
      <Section title={sectionTitle}>
        <CalendarInput
          dateSelection={selection}
          icon={<IconCalendar width={16} height={16} />}
          isValidDay={isValidDay}
          onChange={this.handleDateChange}
          months={months}
          strings={{
            end: 'End',
            select: 'Select a date',
            start: 'Initial',
          }}
          value={this.state.value}
        />
      </Section>
    )
  }
}

CalendarInputState.propTypes = {
  months: PropTypes.oneOf([1, 2]).isRequired,
  selection: PropTypes.oneOf(['single', 'period']).isRequired,
  sectionTitle: PropTypes.string,
  value: PropTypes.shape({
    end: PropTypes.instanceOf(moment),
    start: PropTypes.instanceOf(moment),
  }),
}

CalendarInputState.defaultProps = {
  sectionTitle: '',
  value: {
    end: null,
    start: null,
  },
}

storiesOf('CalendarInput', module)
  .add('Default CalendarInput', () => (
    <div className={style.main}>
      <CalendarInputState
        months={1}
        sectionTitle="Default state"
        selection="single"
      />
      <CalendarInputState
        months={1}
        sectionTitle="Error state"
        selection="single"
        value={weekendDates}
      />
    </div>
  ))
  .add('CalendarInput with period selection', () => (
    <div className={style.main}>
      <CalendarInputState
        months={2}
        sectionTitle="Default state"
        selection="period"
        value={defaultValidDates}
      />
      <CalendarInputState
        months={2}
        sectionTitle="Error state"
        selection="period"
        value={weekendDates}
      />
    </div>
  ))

