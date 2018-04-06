import React from 'react'
import PropTypes from 'prop-types'

import RadioGroup from '../'

const options = [
  {
    name: 'Airplane',
    value: 'airplane',
  },
  {
    name: 'Pilot',
    value: 'pilot',
  },
  {
    name: 'Passenger',
    value: 'passenger',
  },
]

class RadioGroupState extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: 'airplane',
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.setState({
      value: event.target.value,
    })
  }

  render () {
    const {
      disabled,
      error,
      name,
    } = this.props

    const {
      value,
    } = this.state

    return (
      <div>
        <RadioGroup
          options={options}
          name={name}
          onChange={this.handleChange}
          value={value}
          disabled={disabled}
          error={error}
        />

        <p>Selected: {value}</p>
      </div>
    )
  }
}

RadioGroupState.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  name: PropTypes.string,
}

RadioGroupState.defaultProps = {
  disabled: false,
  error: '',
  name: '',
}

export default RadioGroupState
