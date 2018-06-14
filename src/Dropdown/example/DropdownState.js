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
    return this.props.type !== 'form'
      ? (
        <DropdownDefault
          options={options}
          name="things"
          onChange={value => this.setState({ selected: value })}
          value={this.state.selected}
          disabled={this.props.disabled}
          placeholder={this.props.placeholder}
          error={this.props.error}
          size={this.props.size}
        />
      )
      : (
        <DropdownForm
          options={options}
          name="things"
          onChange={event => this.setState({ selected: event.target.value })}
          value={this.state.selected}
          disabled={this.props.disabled}
          placeholder={this.props.placeholder}
          error={this.props.error}
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
