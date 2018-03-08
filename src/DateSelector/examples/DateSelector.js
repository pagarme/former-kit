import React from 'react'
import moment from 'moment'

import DateSelector from '../'

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
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleChange (dates) {
    this.setState({ dates })
  }

  handleFocusChange (focusedInput) {
    this.setState({ focusedInput })
  }

  handleConfirm (dates) {
    this.setState({
      dates,
    })
  }

  handleCancel () {
    this.setState({
      dates: {
        start: moment(),
        end: moment(),
      },
    })
  }

  render () {
    return (
      <div>
        <DateSelector
          presets={presets}
          dates={this.state.dates}
          focusedInput={this.state.focusedInput}
          onFocusChange={this.handleFocusChange}
          onChange={this.handleChange}
          onConfirm={this.handleConfirm}
          onCancel={this.handleCancel}
        />
        <div>
          <br />
          <b> Component output dates </b>
          <br />
          <div>
            <div>
              <b> Start: </b>
              { moment(this.state.dates.start).format('DD/MM/YYYY') }
            </div>
            <div>
              <b> End: </b>
              { moment(this.state.dates.end).format('DD/MM/YYYY') }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DateSelectorExample
