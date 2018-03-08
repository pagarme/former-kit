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

  componentWillMount () {
    if (this.props.success) {
      this.setState({
        value: 'passenger',
      })
    }
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
      success,
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
          success={success}
        />

        <pre>Selected: {value}</pre>
      </div>
    )
  }
}

RadioGroupState.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  name: PropTypes.string,
  success: PropTypes.string,
}

RadioGroupState.defaultProps = {
  disabled: false,
  error: '',
  name: '',
  success: '',
}

export default RadioGroupState
