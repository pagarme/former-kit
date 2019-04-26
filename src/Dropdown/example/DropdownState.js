import React from 'react'
import PropTypes from 'prop-types'
import DropdownDefault from '../index'
import DropdownForm from '../form'

const options = [
  {
    name: 'Pagar.me',
    value: 'pagarme',
  },
  {
    name: 'Open Source',
    value: 'open-source',
  },
]

class DropdownState extends React.Component {
  constructor (props) {
    super(props)
    this.state = { selected: '' }
  }

  render () {
    const {
      disabled,
      error,
      placeholder,
      size,
      type,
    } = this.props
    const { selected } = this.state
    return type !== 'form'
      ? (
        <DropdownDefault
          options={options}
          name="things"
          onChange={value => this.setState({ selected: value })}
          value={selected}
          disabled={disabled}
          placeholder={placeholder}
          error={error}
          size={size}
        />
      )
      : (
        <DropdownForm
          options={options}
          name="things"
          onChange={event => this.setState({ selected: event.target.value })}
          value={selected}
          disabled={disabled}
          placeholder={placeholder}
          error={error}
        />
      )
  }
}

DropdownState.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['tiny']),
  type: PropTypes.oneOf(['default', 'form']),
}

DropdownState.defaultProps = {
  disabled: false,
  error: '',
  placeholder: '',
  size: null,
  type: 'default',
}

export default DropdownState
