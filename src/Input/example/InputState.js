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
      error,
      icon,
      multiline,
      size,
      success,
      type,
      inputStyle,
      label,
      hint,
      disabled,
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
  error: PropTypes.string,
  success: PropTypes.string,
  icon: PropTypes.element,
  multiline: PropTypes.bool,
  size: PropTypes.string,
  type: PropTypes.string,
  inputStyle: PropTypes.string,
  label: PropTypes.string,
  hint: PropTypes.string,
  disabled: PropTypes.bool,
}

InputState.defaultProps = {
  base: 'light',
  error: '',
  success: '',
  icon: null,
  multiline: false,
  type: '',
  size: null,
  inputStyle: 'default',
  label: '',
  hint: '',
  disabled: false,
}

export default InputState
