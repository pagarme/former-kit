import React from 'react'
import { storiesOf } from '@storybook/react'

import RadioGroup from '../../src/RadioGroup'
import Section from '../Section'

const options = [
  {
    name: 'Github',
    value: 'github',
  },
  {
    name: 'Open Source',
    value: 'open-source',
  },
  {
    name: 'Pilot',
    value: 'pilot',
  },
]

class RadioGroupState extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: 'github' }
  }

  render () {
    const {
      disabled,
      error,
      name,
    } = this.props

    const {
      value,
    } = this.state

    return (
      <div>
        <RadioGroup
          options={options}
          name={name}
          onChange={event => this.setState({ value: event.target.value })}
          value={value}
          disabled={disabled}
          error={error}
        />

        <p>Selected: {value}</p>
      </div>
    )
  }
}

RadioGroupState.defaultProps = {
  disabled: false,
  error: '',
}

storiesOf('Radio Group', module)
  .add('Default', () => (
    <div>
      <Section title="Default">
        <RadioGroupState name="default" />
      </Section>

      <Section title="Error">
        <RadioGroupState name="error" error="Error!" />
      </Section>

      <Section title="Disabled">
        <RadioGroupState name="disabled" disabled />
      </Section>
    </div>
  ))
