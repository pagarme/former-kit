import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import IconCalendar from 'emblematic-icons/svg/Calendar32.svg'

import Button from '../../Button'
import DateInput from '../'

class DateInputState extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      dates: {
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
    this.setState({ dates: { start, end } })
  }

  handleReset () {
    const { start, end } = this.props
    this.setState({ dates: { start, end } })
  }

  handleDatesChange (dates) {
    this.setState({ dates })
  }

  render () {
    const { dates } = this.state

    return (
      <div>
        <DateInput
          presets={this.datePresets}
          dates={dates}
          onChange={this.handleDatesChange}
          active={dates.start && dates.end && true}
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

DateInputState.propTypes = {
  start: PropTypes.instanceOf(moment),
  end: PropTypes.instanceOf(moment),
}

DateInputState.defaultProps = {
  start: null,
  end: null,
}

export default DateInputState
