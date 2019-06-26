import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import moment from 'moment'
import IconCalendar from 'emblematic-icons/svg/Calendar32.svg'

import Button from '../../src/Button'
import DateInput from '../../src/DateInput'
import DropDown from '../../src/Dropdown'
import Section from '../Section'

import presets from './datePresets'
import style from './style.css'

const presetsOptions = [
  {
    name: '7 days',
    value: 'last-7',
  },
  {
    name: '15 days',
    value: 'last-15',
  },
  {
    name: '30 days',
    value: 'last-30',
  },
  {
    name: 'Today',
    value: 'today',
  },
]

class DateInputState extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      dates: props.dates || {},
      selectedPreset: props.selectedPreset || 'last-7',
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
    const { dates } = this.props
    this.setState({ dates })
  }

  render () {
    const {
      selectablePresets,
      selectionMode,
      showClearButton,
      showSidebar,
    } = this.props
    const {
      dates,
      selectedPreset,
      showCalendar,
    } = this.state
    return (
      <Fragment>
        {
          selectablePresets
          && (
            <Fragment>
              <h3>Available presets</h3>
              <p>The presets can be changed by a parent component</p>
            </Fragment>
          )
        }
        <div className={style.container}>
          {
            selectablePresets
            && (
              <div className={style.presetSelector}>
                <DropDown
                  name="presets"
                  onChange={event => this.setState({
                    selectedPreset: event.target.value,
                  })}
                  options={presetsOptions}
                  value={selectedPreset}
                />
              </div>
            )
          }
          <DateInput
            dates={dates}
            icon={<IconCalendar width={16} height={16} />}
            onConfirm={action('onConfirm')}
            onChange={action('onChange')}
            onPresetChange={this.handlePresetChange}
            presets={presets}
            selectedPreset={selectedPreset}
            selectionMode={selectionMode}
            showCalendar={showCalendar}
            showSidebar={showSidebar}
          />
          { showClearButton && (
            <Button onClick={this.resetDates}>
              Reset Dates
            </Button>
          )}
        </div>
      </Fragment>
    )
  }
}

DateInputState.defaultProps = {
  end: null,
  selectablePresets: null,
  selectedPreset: '',
  start: null,
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
          end: moment(),
          start: moment(),
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
          end: moment(),
          start: moment().subtract(4, 'days'),
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
        selectablePresets={['last-7', 'last-15', 'last-30', 'today']}
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
          end: moment().subtract(15, 'day'),
          start: moment().subtract(15, 'day'),
        }}
        showClearButton
      />
    </Section>
  ))

