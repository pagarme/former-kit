import React from 'react'
import { storiesOf } from '@storybook/react'

import SegmentedSwitch from '../../src/SegmentedSwitch'
import Section from '../Section'

class SegmentedSwitchState extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selected: '',
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount () {
    this.setState({
      selected: this.props.selected,
    })
  }

  handleChange (value) {
    this.setState({ selected: value })
  }

  render () {
    return (
      <SegmentedSwitch
        items={this.props.items}
        onChange={this.handleChange}
        name={this.props.name}
        selected={this.state.selected}
      />
    )
  }
}

storiesOf('SegmentedSwitch', module)
  .add('Default', () => (
    <div>
      <Section title="Two options">
        <SegmentedSwitchState
          items={['test', 'live']}
          selected="test"
          name="live-test"
        />
      </Section>
      <Section title="Four options">
        <SegmentedSwitchState
          items={['test', 'live', 'super-test', 'extra-live']}
          selected="super-test"
          name="super-extra"
        />
      </Section>
    </div>
  ))

