import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Calendar from '../index'

class CalendarExample extends Component {
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
  }

  render () {
    const {
      months,
      selection,
    } = this.props
    const { dates } = this.state
    return (
      <Calendar
        dates={dates}
        dateSelection={selection}
        months={months}
        onChange={this.handleChange}
      />
    )
  }
}

CalendarExample.propTypes = {
  months: PropTypes.oneOf([1, 2]),
  selection: PropTypes.oneOf(['single', 'period']),
}

CalendarExample.defaultProps = {
  months: 1,
  selection: 'single',
}

export default CalendarExample
