import React from 'react'
import { storiesOf } from '@storybook/react'
import moment from 'moment'
import IconArrowLeft from 'react-icons/lib/fa/angle-left'
import IconArrowRight from 'react-icons/lib/fa/angle-right'

import DateSelector from '../../src/DateSelector'

import style from './style.css'

const presets = [
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
        start: moment(),
        end: moment(),
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
        icons={{
          previousMonth: <IconArrowLeft />,
          nextMonth: <IconArrowRight />,
        }}
      />
    )
  }
}

storiesOf('DateSelector', module)
  .add('All types with defaultTheme', () => (
    <div className={style.container}>
      <DateSelectorExample />
    </div>
  ))
