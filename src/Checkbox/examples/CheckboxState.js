import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../'

class CheckState extends React.Component {
  constructor (props) {
    super(props)
    this.state = { checked: false }
  }

  render () {
    const {
      label,
      name,
      error,
      disabled,
      value,
    } = this.props

    const { checked } = this.state

    return (
      <Checkbox
        label={label}
        name={name}
        error={error}
        disabled={disabled}
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
  value: PropTypes.string,
}

CheckState.defaultProps = {
  disabled: false,
  error: null,
  value: '',
}

export default CheckState
