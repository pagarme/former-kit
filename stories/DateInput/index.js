import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import moment from 'moment'
import IconCalendar from 'emblematic-icons/svg/Calendar32.svg'

import Button from '../../src/Button'
import Section from '../Section'
import DateInput from '../../src/DateInput'

import presets from './datePresets'
import style from './style.css'

class DateInputState extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      dates: props.dates || {},
      showCalendar: props.showCalendar,
    }

    this.handlePresetChange = this.handlePresetChange.bind(this)
    this.resetDates = this.resetDates.bind(this)
  }

  handlePresetChange (dates, preset) {
    this.setState({
      showCalendar: true,
    })

    action('onPresetChange')({ dates, preset })
  }

  resetDates () {
    this.setState({
      dates: this.props.dates,
    })
  }

  render () {
    const {
      selectedPreset,
      selectionMode,
      showClearButton,
      showSidebar,
    } = this.props

    return (
      <div className={style.container}>
        <DateInput
          dates={this.state.dates}
          icon={<IconCalendar width={16} height={16} />}
          onConfirm={action('onConfirm')}
          onChange={action('onChange')}
          onPresetChange={this.handlePresetChange}
          presets={presets}
          selectedPreset={selectedPreset}
          selectionMode={selectionMode}
          showCalendar={this.state.showCalendar}
          showSidebar={showSidebar}
        />
        { showClearButton &&
          <Button onClick={this.resetDates}>Reset Dates</Button>
        }
      </div>
    )
  }
}

DateInputState.defaultProps = {
  selectedPreset: '',
  start: null,
  end: null,
}

storiesOf('DateInput', module)
  .add('without sidebar and single selection', () => (
    <Section>
      <DateInputState
        showSidebar={false}
      />
    </Section>
  ))
  .add('without sidebar and pre selected date', () => (
    <Section>
      <DateInputState
        dates={{
          start: moment(),
          end: moment(),
        }}
        showSidebar={false}
      />
    </Section>
  ))
  .add('without sidebar and period selection', () => (
    <Section>
      <DateInputState
        selectionMode="period"
        showSidebar={false}
      />
    </Section>
  ))
  .add('without sidebar and pre selected period', () => (
    <Section>
      <DateInputState
        dates={{
          start: moment().subtract(4, 'days'),
          end: moment(),
        }}
        selectionMode="period"
        showSidebar={false}
      />
    </Section>
  ))
  .add('with sidebar', () => (
    <Section>
      <DateInputState />
    </Section>
  ))
  .add('with sidebar and selected preset', () => (
    <Section>
      <DateInputState
        selectedPreset="last-7"
      />
    </Section>
  ))
  .add('with sidebar first', () => (
    <Section>
      <DateInputState
        showCalendar={false}
      />
    </Section>
  ))
  .add('with sidebar and clear button', () => (
    <Section>
      <DateInputState
        dates={{
          start: moment().subtract(15, 'day'),
          end: moment().subtract(15, 'day'),
        }}
        showClearButton
      />
    </Section>
  ))

