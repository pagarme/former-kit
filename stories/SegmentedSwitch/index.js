import React from 'react'
import { storiesOf } from '@storybook/react'

import IconTable from 'emblematic-icons/svg/Menu32.svg'
import IconChart from 'emblematic-icons/svg/TrendingUp32.svg'

import SegmentedSwitch from '../../src/SegmentedSwitch'
import Section from '../Section'

class SegmentedSwitchState extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value,
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (value) {
    this.setState({ value })
  }

  render () {
    const {
      disabled,
      name,
      options,
    } = this.props
    const { value } = this.state
    return (
      <SegmentedSwitch
        disabled={disabled}
        options={options}
        onChange={this.handleChange}
        name={name}
        value={value}
      />
    )
  }
}

storiesOf('SegmentedSwitch', module)
  .add('Default', () => (
    <div>
      <Section title="Two options">
        <SegmentedSwitchState
          name="live-test"
          options={[
            {
              title: 'Test',
              value: 'test',
            },
            {
              title: 'Live',
              value: 'live',
            },
          ]}
          value="test"
        />
      </Section>
      <Section title="Four options">
        <SegmentedSwitchState
          name="super-extra-options"
          options={[
            {
              title: 'Test',
              value: 'test',
            },
            {
              title: 'Live',
              value: 'live',
            },
            {
              title: 'Super Test',
              value: 'super-test',
            },
            {
              title: 'Extra Live',
              value: 'extra-live',
            },
          ]}
          value="super-test"
        />
      </Section>
      <Section title="With icons">
        <SegmentedSwitchState
          name="table-chart"
          options={[
            {
              title: <IconTable width={16} height={16} />,
              value: 'table',
            },
            {
              title: <IconChart width={16} height={16} />,
              value: 'chart',
            },
          ]}
          value="table"
        />
      </Section>
      <Section title="Disabled">
        <SegmentedSwitchState
          disabled
          name="disabled"
          options={[
            {
              title: <IconTable width={16} height={16} />,
              value: 'table',
            },
            {
              title: <IconChart width={16} height={16} />,
              value: 'chart',
            },
          ]}
          value="table"
        />
      </Section>
    </div>
  ))

