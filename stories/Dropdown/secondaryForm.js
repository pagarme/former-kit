import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import Section from '../Section'
import Dropdown from '../../src/Dropdown/secondary-form'

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

const DropdownState = ({
  disabled,
  error,
  placeholder,
  size,
  value,
}) => {
  const [selected, setSelected] = useState(value)

  return (
    <div>
      <Dropdown
        options={options}
        name="Things"
        onChange={event => setSelected(event.target.value)}
        value={selected}
        disabled={disabled}
        placeholder={placeholder}
        error={error}
        size={size}
      />
      <p>Selected: {selected}</p>
    </div>
  )
}

DropdownState.defaultProps = {
  disabled: false,
  error: '',
  placeholder: '',
  size: null,
  value: '',
}

storiesOf('Dropdown', module)
  .add('SecondaryForm', () => (
    <div>
      <Section title="Default">
        <DropdownState />
      </Section>

      <Section title="Huge dropdown">
        <DropdownState placeholder="Select" size="huge" />
      </Section>

      <Section title="With placeholder">
        <DropdownState placeholder="Select" />
      </Section>

      <Section title="Error">
        <DropdownState error="Something went wrong" />
      </Section>

      <Section title="Disabled">
        <DropdownState disabled />
      </Section>

      <Section title="Disabled with placeholder">
        <DropdownState disabled placeholder="Select" />
      </Section>

      <Section title="dropdown with value">
        <DropdownState
          value="open-source"
        />
      </Section>
    </div>
  ))
