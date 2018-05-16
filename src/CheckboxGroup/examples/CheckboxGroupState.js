import React from 'react'
import PropTypes from 'prop-types'
import CheckboxGroup from '../'

class CheckboxGroupState extends React.Component {
  constructor (props) {
    super(props)

    this.state = { value: ['pagarme'] }
  }

  render () {
    const options = [
      {
        label: 'Github',
        value: 'github',
      },
      {
        label: 'Open Source',
        value: 'open-source',
      },
      {
        label: 'Pilot',
        value: 'pilot',
      },
      {
        label: 'React',
        value: 'react',
      },
      {
        label: 'Storybook',
        value: 'Storybook',
      },
    ]

    const {
      disabled,
      error,
      name,
    } = this.props

    return (
      <CheckboxGroup
        columns={2}
        disabled={disabled}
        error={error}
        name={name}
        onChange={value => this.setState({ value })}
        options={options}
        value={this.state.value}
      />
    )
  }
}

CheckboxGroupState.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
}

CheckboxGroupState.defaultProps = {
  disabled: false,
  error: null,
}

export default CheckboxGroupState
