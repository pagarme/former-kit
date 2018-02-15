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
    return this.props.type === 'default'
      ? (
        <DropdownDefault
          options={options}
          name="things"
          onChange={value => this.setState({ selected: value })}
          value={this.state.selected}
          disabled={this.props.disabled}
          placeholder={this.props.placeholder}
        />
      )
      : (
        <DropdownForm
          options={options}
          name="things"
          onChange={value => this.setState({ selected: value })}
          value={this.state.selected}
          disabled={this.props.disabled}
          placeholder={this.props.placeholder}
          error={this.props.error}
          success={this.props.success}
        />
      )
  }
}

DropdownState.propTypes = {
  type: PropTypes.oneOf(['default', 'form']),
  disabled: PropTypes.bool,
  error: PropTypes.string,
  success: PropTypes.string,
  placeholder: PropTypes.string,
}

DropdownState.defaultProps = {
  type: 'default',
  disabled: false,
  error: '',
  success: '',
  placeholder: '',
}

export default DropdownState
