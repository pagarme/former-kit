import React from 'react'
import { storiesOf } from '@storybook/react'
import moment from 'moment'

import Section from '../Section'
import DateSelector from '../../src/DateSelector'

const presets = [
  {
    title: 'Last:',
    items: [
      {
        key: 'last-7',
        title: '7 days',
        date: () => -7,
      },
      {
        key: 'last-15',
        title: '15 days',
        date: () => -15,
      },
      {
        key: 'last-30',
        title: '30 days',
        date: () => -30,
      },
      {
        key: 'last-60',
        title: '60 days',
        date: () => -60,
      },
    ],
  },
]

/*
  Do not use storybook addon actions,
  it changes context and crashes this component
*/
const action = (func, params) => {
  console.log(func, params) // eslint-disable-line no-console
}

class DateSelectorExample extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      dates: {
        start: moment().subtract(5, 'days'),
        end: moment().subtract(2, 'days'),
      },
      focusedInput: 'startDate',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleFocusChange = this.handleFocusChange.bind(this)
  }

  handleChange (dates) {
    this.setState({ dates })
  }

  handleFocusChange (focusedInput) {
    this.setState({ focusedInput })
  }

  render () {
    return (
      <DateSelector
        presets={presets}
        dates={this.state.dates}
        focusedInput={this.state.focusedInput}
        onFocusChange={this.handleFocusChange}
        onChange={this.handleChange}
        onConfirm={dates => action('onConfirm', dates)}
        onCancel={() => action('onCancel', '')}
      />
    )
  }
}

storiesOf('DateSelector', module)
  .add('All types with defaultTheme', () => (
    <Section>
      <DateSelectorExample />
    </Section>
  ))
