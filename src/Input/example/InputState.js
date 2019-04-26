import React from 'react'
import PropTypes from 'prop-types'
import DefaultInput from '../index'
import FormInput from '../form'

class InputState extends React.Component {
  constructor (props) {
    super(props)
    this.state = { email: 'Pagarme' }
  }

  render () {
    const {
      base,
      disabled,
      error,
      hint,
      icon,
      inputStyle,
      label,
      multiline,
      size,
      success,
      type,
    } = this.props

    const {
      email,
    } = this.state

    return inputStyle === 'default'
      ? (
        <DefaultInput
          base={base}
          error={error}
          hint={hint}
          icon={icon}
          label={label}
          multiline={multiline}
          name="email"
          onChange={e => this.setState({ email: e.target.value })}
          placeholder="name@email.com"
          size={size}
          success={success}
          type={type}
          value={email}
          disabled={disabled}
        />
      )
      : (
        <FormInput
          base={base}
          error={error}
          hint={hint}
          icon={icon}
          label={label}
          multiline={multiline}
          name="email"
          onChange={e => this.setState({ email: e.target.value })}
          placeholder="nome@email.com"
          success={success}
          type={type}
          value={email}
          disabled={disabled}
        />
      )
  }
}

InputState.propTypes = {
  base: PropTypes.oneOf([
    'dark',
    'light',
  ]),
  disabled: PropTypes.bool,
  error: PropTypes.string,
  hint: PropTypes.string,
  icon: PropTypes.element,
  inputStyle: PropTypes.string,
  label: PropTypes.string,
  multiline: PropTypes.bool,
  size: PropTypes.string,
  success: PropTypes.string,
  type: PropTypes.string,
}

InputState.defaultProps = {
  base: 'light',
  disabled: false,
  error: '',
  hint: '',
  icon: null,
  inputStyle: 'default',
  label: '',
  multiline: false,
  size: null,
  success: '',
  type: '',
}

export default InputState
