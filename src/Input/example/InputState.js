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
      error,
      icon,
      multiline,
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
          error={error}
          hint={hint}
          icon={icon}
          label={label}
          multiline={multiline}
          name="email"
          onChange={e => this.setState({ email: e.target.value })}
          placeholder="name@email.com"
          success={success}
          type={type}
          value={email}
          disabled={disabled}
        />
      )
      : (
        <FormInput
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
  error: PropTypes.string,
  success: PropTypes.string,
  icon: PropTypes.element,
  multiline: PropTypes.bool,
  type: PropTypes.string,
  inputStyle: PropTypes.string,
  label: PropTypes.string,
  hint: PropTypes.string,
  disabled: PropTypes.bool,
}

InputState.defaultProps = {
  error: '',
  success: '',
  icon: null,
  multiline: false,
  type: '',
  inputStyle: 'default',
  label: '',
  hint: '',
  disabled: false,
}

export default InputState
