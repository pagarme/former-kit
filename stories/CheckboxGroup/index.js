import React from 'react'

import { storiesOf } from '@storybook/react'

import Section from '../Section'
import CheckboxGroup from '../../src/CheckboxGroup'

class CheckboxGroupState extends React.Component {
  constructor (props) {
    super(props)

    this.state = { values: ['github'] }
  }

  render () {
    const options = [
      {
        label: 'Github',
        value: 'github',
      },
      {
        label: 'Open Source',
        value: 'open-source',
      },
      {
        label: 'Pilot',
        value: 'pilot',
      },
      {
        label: 'React',
        value: 'react',
      },
      {
        label: 'Storybook',
        value: 'Storybook',
      },
    ]

    const {
      disabled,
      error,
      name,
    } = this.props
    const { values } = this.state
    return (
      <div>
        <CheckboxGroup
          columns={2}
          disabled={disabled}
          error={error}
          name={name}
          onChange={newValues => this.setState({ values: newValues })}
          options={options}
          value={values}
        />

        <p>Selected: {values.join(', ')}</p>
      </div>
    )
  }
}

CheckboxGroupState.defaultProps = {
  disabled: false,
  error: '',
}

storiesOf('Checkbox Group', module)
  .add('Default', () => (
    <div>
      <Section title="Default">
        <CheckboxGroupState name="default" />
      </Section>

      <Section title="Error">
        <CheckboxGroupState name="error" error="Error!" />
      </Section>

      <Section title="Disabled">
        <CheckboxGroupState name="disabled" disabled />
      </Section>
    </div>
  ))
