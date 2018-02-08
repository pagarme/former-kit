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

  componentWillMount () {
    if (this.props.success) {
      this.setState({ value: 'Pilot' })
    }
  }

  render () {
    const {
      disabled,
      error,
      name,
      success,
    } = this.props

    const {
      value,
    } = this.state

    return (
      <div>
        <RadioGroup
          options={options}
          name={name}
          onChange={v => this.setState({ value: v })}
          value={value}
          disabled={disabled}
          error={error}
          success={success}
        />

        <pre>Selected: {value}</pre>
      </div>
    )
  }
}

RadioGroupState.defaultProps = {
  disabled: false,
  error: '',
  success: '',
}

storiesOf('Radio Group', module)
  .add('Default', () => (
    <div>
      <Section title="Disabled">
        <RadioGroupState name="disabled" disabled />
      </Section>

      <Section title="Default">
        <RadioGroupState name="default" />
      </Section>

      <Section title="Success">
        <RadioGroupState name="success" success="Success!" />
      </Section>

      <Section title="Error">
        <RadioGroupState name="error" error="Error!" />
      </Section>
    </div>
  ))
