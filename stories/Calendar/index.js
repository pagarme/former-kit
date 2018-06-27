import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { contains } from 'ramda'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Section from '../Section'
import Calendar from '../../src/Calendar'

const isWeekendDay = date =>
  date && date.weekday && contains(date.weekday(), [0, 6])

class CalendarState extends Component {
  constructor () {
    super()

    this.state = {
      dates: {
        end: moment('2018-06-27'),
        start: moment('2018-06-27').subtract(5, 'days'),
      },
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (dates) {
    this.setState({ dates })
    action('change')(dates)
  }

  render () {
    const {
      months,
      selection,
      ...props
    } = this.props

    return (
      <Section>
        <Calendar
          dates={this.state.dates}
          dateSelection={selection}
          months={months}
          onChange={this.handleChange}
          {...props}
        />
      </Section>
    )
  }
}

CalendarState.propTypes = {
  months: PropTypes.oneOf([1, 2]).isRequired,
  selection: PropTypes.oneOf(['single', 'period']).isRequired,
}

storiesOf('Calendar', module)
  .add('Single date and one month', () => (
    <CalendarState
      months={1}
      selection="single"
    />
  ))
  .add('Period selection and two visible months', () => (
    <CalendarState
      months={2}
      selection="period"
    />
  ))
  .add('Calendar with disabled dates', () => (
    <CalendarState
      months={1}
      selection="single"
      isDayBlocked={isWeekendDay}
    />
  ))
