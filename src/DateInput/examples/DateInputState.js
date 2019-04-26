import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import IconCalendar from 'emblematic-icons/svg/Calendar32.svg'

import Button from '../../Button'
import DateInput from '..'

import style from './style.css'

class DateInputState extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      dates: {
        end: props.end,
        start: props.start,
      },
    }

    this.datePresets = [
      {
        items: [
          {
            date: () => -7,
            key: 'last-7',
            title: '7 dias',
          },
          {
            date: () => -15,
            key: 'last-15',
            title: '15 dias',
          },
          {
            date: () => -30,
            key: 'last-30',
            title: '30 dias',
          },
          {
            date: () => -60,
            key: 'last-60',
            title: '60 dias',
          },
        ],
        title: 'Últimos:',
      },
    ]

    this.handleDatesChange = this.handleDatesChange.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  componentWillReceiveProps ({ end, start }) {
    this.setState({ dates: { end, start } })
  }

  handleReset () {
    const { end, start } = this.props
    this.setState({ dates: { end, start } })
  }

  handleDatesChange (dates) {
    this.setState({ dates })
  }

  render () {
    const { dates } = this.state

    return (
      <div className={style.dateInput}>
        <DateInput
          presets={this.datePresets}
          value={dates}
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
  end: PropTypes.instanceOf(moment),
  start: PropTypes.instanceOf(moment),
}

DateInputState.defaultProps = {
  end: null,
  start: null,
}

export default DateInputState
