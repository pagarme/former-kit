import React from 'react'
import { storiesOf } from '@storybook/react'
import Checkbox from '../../src/Checkbox'
import style from '../style.css'

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
      success,
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
        success={success}
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
  success: '',
}

storiesOf('Checkbox', module)
  .add('Default', () => (
    <div className={style.container}>
      <h2>Form Inputs</h2>

      <section>
        <h3>Disabled</h3>

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
      </section>

      <section>
        <h3>Default</h3>
        <CheckboxState
          name="default"
          label="Unchecked"
        />

        <CheckboxState
          name="checkedDefault"
          label="Checked"
          checked
        />
      </section>

      <section>
        <h3>Error</h3>
        <CheckboxState
          name="default"
          label="Error"
          value="Error"
          error="Error"
        />
      </section>

      <section>
        <h3>Success</h3>
        <CheckboxState
          name="default"
          label="Success"
          value="Success"
          success="Success"
        />
      </section>
    </div>
  ))
