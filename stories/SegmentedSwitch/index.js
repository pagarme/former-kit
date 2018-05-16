import React from 'react'
import { storiesOf } from '@storybook/react'

import SegmentedSwitch from '../../src/SegmentedSwitch'
import Section from '../Section'

class SegmentedSwitchState extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: '',
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount () {
    this.setState({
      value: this.props.value,
    })
  }

  handleChange (value) {
    this.setState({ value })
  }

  render () {
    return (
      <SegmentedSwitch
        options={this.props.options}
        onChange={this.handleChange}
        name={this.props.name}
        value={this.state.value}
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
    </div>
  ))

