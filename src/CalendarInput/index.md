First, let's create a wrapper component 
to handle the state of the calendar input.
``` jsx static
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { complement, contains } from 'ramda'
import IconCalendar from 'emblematic-icons/svg/Calendar32.svg'
import CalendarInput from '../index'

const isWeekendDay = date =>
  date && date.weekday && contains(date.weekday(), [0, 6])

const isWeekDay = complement(isWeekendDay)

const isValidDay = (date) => {
  if (date && date.isValid()) {
    return isWeekDay(date)
  }
  return false
}

class CalendarInputExample extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: {
        end: null,
        start: null,
      },
    }
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  handleDateChange (value) {
    this.setState({ value })
  }

  render () {
    const {
      months,
      selection,
    } = this.props
    return (
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
    )
  }
}

CalendarInputExample.propTypes = {
  months: PropTypes.oneOf([1, 2]).isRequired,
  selection: PropTypes.oneOf(['single', 'period']).isRequired,
}

export default CalendarInputExample
```

#### **Examples** ####

### Single selection and one month
```jsx
const CalendarInputExample = require('./examples/CalendarInput').default;

<CalendarInputExample
  months={1}
  selection="single"
/>
```

### Period selection and two months
```jsx
const CalendarInputExample = require('./examples/CalendarInput').default;
<CalendarInputExample
  months={2}
  selection="period"
/>
```
