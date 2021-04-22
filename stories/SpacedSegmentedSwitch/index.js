import React from 'react'
import { storiesOf } from '@storybook/react'

import IconChart from 'emblematic-icons/svg/TrendingUp32.svg'
import IconLock from 'emblematic-icons/svg/Lock32.svg'
import IconTable from 'emblematic-icons/svg/Menu32.svg'

import Section from '../Section'
import SpacedSegmentedSwitch from '../../src/SegmentedSwitch/Spaced'

class SpacedSegmentedSwitchState extends React.Component {
  constructor (props) {
    super(props)

    const { value } = props
    this.state = {
      value,
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
      relevance,
      spacing,
    } = this.props
    const { value } = this.state
    return (
      <SpacedSegmentedSwitch
        disabled={disabled}
        name={name}
        onChange={this.handleChange}
        options={options}
        relevance={relevance}
        spacing={spacing}
        value={value}
      />
    )
  }
}

storiesOf('SpacedSegmentedSwitch', module)
  .add('Default', () => (
    <div>
      <Section title="Four options">
        <SpacedSegmentedSwitchState
          name="money-test"
          options={[
            {
              title: 'From $0 to $25',
              value: 'from0to25',
            },
            {
              title: 'From $25 to $50',
              value: 'from25to100',
            },
            {
              title: 'From $50 to $100',
              value: 'from50to100',
            },
            {
              title: 'More than $100',
              value: 'moreThan100',
            },
          ]}
          value="from25to100"
        />
      </Section>
      <Section title="With low relevance and tiny spacing">
        <SpacedSegmentedSwitchState
          name="table-chart"
          options={[
            {
              title: 'From $0 to $25',
              value: 'from0to25',
            },
            {
              title: 'From $25 to $50',
              value: 'from25to100',
            },
            {
              title: 'From $50 to $100',
              value: 'from50to100',
            },
            {
              title: 'More than $100',
              value: 'moreThan100',
            },
          ]}
          relevance="low"
          spacing="tiny"
          value="table"
        />
      </Section>
      <Section title="With icons">
        <SpacedSegmentedSwitchState
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
            {
              title: <IconLock width={16} height={16} />,
              value: 'lock',
            },
          ]}
          value="table"
        />
      </Section>
      <Section title="With icons and low relevance">
        <SpacedSegmentedSwitchState
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
            {
              title: <IconLock width={16} height={16} />,
              value: 'lock',
            },
          ]}
          relevance="low"
          value="table"
        />
      </Section>
      <Section title="Disabled">
        <SpacedSegmentedSwitchState
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
            {
              title: <IconLock width={16} height={16} />,
              value: 'lock',
            },
          ]}
          value="table"
        />
      </Section>
    </div>
  ))

