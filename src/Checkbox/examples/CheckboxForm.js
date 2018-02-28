import React from 'react'
import PropTypes from 'prop-types'
import CheckboxForm from '../form'

class CheckState extends React.Component {
  constructor (props) {
    super(props)
    this.state = { checked: false }
  }

  render () {
    const {
      label,
      name,
      success,
      error,
      disabled,
      value,
    } = this.props

    const { checked } = this.state

    return (
      <CheckboxForm
        label={label}
        name={name}
        error={error}
        disabled={disabled}
        success={success}
        checked={checked}
        onChange={() => this.setState({ checked: !checked })}
        value={value}
      />
    )
  }
}

CheckState.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  success: PropTypes.string,
  value: PropTypes.string,
}

CheckState.defaultProps = {
  disabled: false,
  error: null,
  success: null,
  value: '',
}

export default CheckState
