First, let's create an wrapper component to handle
with state of the date input.
``` jsx static
import React from 'react'
import moment from 'moment'
import IconCalendar from 'emblematic-icons/svg/Calendar32.svg'
import Button from '../../Button'
import DateInput from '../'

class DateInputState extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: {
        start: props.start,
        end: props.end,
      },
    }

    this.datePresets = [
      {
        title: 'Últimos:',
        items: [
          {
            key: 'last-7',
            title: '7 dias',
            date: () => -7,
          },
          {
            key: 'last-15',
            title: '15 dias',
            date: () => -15,
          },
          {
            key: 'last-30',
            title: '30 dias',
            date: () => -30,
          },
          {
            key: 'last-60',
            title: '60 dias',
            date: () => -60,
          },
        ],
      },
    ]

    this.handleDatesChange = this.handleDatesChange.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  componentWillReceiveProps ({ start, end }) {
    this.setState({ value: { start, end } })
  }

  handleReset () {
    const { start, end } = this.props
    this.setState({ value: { start, end } })
  }

  handleDatesChange (value) {
    this.setState({ value })
  }

  render () {
    const { value } = this.state

    return (
      <div>
        <DateInput
          presets={this.datePresets}
          value={value}
          onChange={this.handleDatesChange}
          active={value.start && value.end && true}
          limits={{
            lower: moment('01-01-2013', 'DD-MM-YYYY'),
            upper: moment('01-01-2025', 'DD-MM-YYYY'),
          }}
          icon={<IconCalendar width={16} height={16} />}
        />
        <Button onClick={this.handleReset}>Reset dates</Button>
      </div>
    )
  }
}
```

#### **Examples** ####

Minimal setup
```jsx
  const DateInputState = require('./examples/DateInputState').default;
  <DateInputState />
```

Specifying single day as initial dates
```jsx
  const moment = require('moment');
  const DateInputState = require('./examples/DateInputState').default;
  <DateInputState start={moment()} end={moment()} />
```

Specifying date range as initial dates
```jsx
  const moment = require('moment');
  const DateInputState = require('./examples/DateInputState').default;
  <DateInputState start={moment().add(-7, 'days')} end={moment()} />
```
