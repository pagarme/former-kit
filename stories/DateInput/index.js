import React from 'react'
import { storiesOf } from '@storybook/react'
import moment from 'moment'
import IconCalendar from 'emblematic-icons/svg/Calendar32.svg'

import Section from '../Section'
import DateInput from '../../src/DateInput'
import Button from '../../src/Button'

import presets from './datePresets'
import style from './style.css'

class DateInputState extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      dates: {
        start: props.start,
        end: props.end,
      },
    }

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
      <div className={style.container}>
        <DateInput
          presets={presets}
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

DateInputState.defaultProps = {
  start: null,
  end: null,
}

storiesOf('DateInput', module)
  .add('All styles', () => (
    <div className={style.main}>
      <h1>DateInput usage</h1>

      <Section title="Minimal setup">
        <DateInputState />
      </Section>

      <Section title="Specifying single day as initial dates">
        <DateInputState start={moment()} end={moment()} />
      </Section>

      <Section title="Specifying date range as initial dates">
        <DateInputState start={moment().add(-7, 'days')} end={moment()} />
      </Section>

      <Section title="Specifying null end as initial dates">
        <DateInputState start={moment().add(-7, 'days')} />
      </Section>
    </div>
  ))

