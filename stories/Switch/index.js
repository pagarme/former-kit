import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'

import Switch from '../../src/Switch'
import Section from '../Section'

class SwitchState extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: props.checked,
    }
  }

  render () {
    const { value } = this.state
    const { disabled } = this.props
    return (
      <Switch
        disabled={disabled}
        checked={value}
        onChange={newValue => this.setState({ value: newValue })}
      />
    )
  }
}

SwitchState.defaultProps = {
  checked: false,
  disabled: false,
}

storiesOf('Switch', module)
  .add('Default', () => (
    <div>
      <Section title="Enabled">
        <p>Checked</p>
        <SwitchState checked />
        <p>Unchecked</p>
        <SwitchState checked={false} />
      </Section>
      <Section title="Disabled">
        <p>Checked</p>
        <SwitchState disabled checked />
        <p>Unchecked</p>
        <SwitchState disabled checked={false} />
      </Section>
    </div>
  ))

