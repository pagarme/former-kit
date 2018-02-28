import React from 'react'
import PropTypes from 'prop-types'
import CheckboxGroup from '../'

class CheckboxGroupState extends React.Component {
  constructor (props) {
    super(props)

    this.state = { values: ['pagarme'] }
  }

  render () {
    const options = [
      {
        label: 'Github',
        value: 'Github',
      },
      {
        label: 'Pagar.me',
        value: 'pagarme',
      },
      {
        label: 'Open source',
        value: 'open-source',
      },
    ]

    const {
      disabled,
      error,
      name,
      success,
    } = this.props

    return (
      <CheckboxGroup
        disabled={disabled}
        error={error}
        name={name}
        onChange={values => this.setState({ values })}
        options={options}
        success={success}
        values={this.state.values}
      />
    )
  }
}

CheckboxGroupState.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  success: PropTypes.string,
}

CheckboxGroupState.defaultProps = {
  disabled: false,
  error: null,
  success: null,
}

export default CheckboxGroupState
