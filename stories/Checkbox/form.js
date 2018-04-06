import React from 'react'
import { storiesOf } from '@storybook/react'
import Section from '../Section'
import Checkbox from '../../src/Checkbox/form'

class CheckboxState extends React.Component {
  constructor (props) {
    super(props)
    this.state = { checked: props.checked }
  }

  render () {
    const {
      disabled,
      error,
      label,
      name,
      value,
    } = this.props

    const {
      checked,
    } = this.state

    return (
      <Checkbox
        checked={checked}
        error={error}
        label={label}
        name={name}
        onChange={() => { this.setState({ checked: !checked }) }}
        value={value}
        disabled={disabled}
      />
    )
  }
}

CheckboxState.defaultProps = {
  name: '',
  value: '',
  label: '',
  checked: false,
  disabled: false,
  error: '',
}

storiesOf('Checkbox', module)
  .add('Form', () => (
    <div>
      <Section title="Default">
        <CheckboxState
          name="default"
          label="Unchecked"
        />

        <CheckboxState
          name="checkedDefault"
          label="Checked"
          checked
        />
      </Section>

      <Section title="Error">
        <CheckboxState
          name="default"
          label="Error"
          value="Error"
          error="Error"
        />
      </Section>

      <Section title="Disabled">
        <CheckboxState
          name="disabled"
          label="Unchecked"
          disabled
        />
        <CheckboxState
          name="checkedDisabled"
          label="Checked"
          disabled
          checked
        />
      </Section>
    </div>
  ))
