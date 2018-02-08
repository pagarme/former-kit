import React from 'react'

import { storiesOf } from '@storybook/react'

import RadioGroup from '../../src/RadioGroup'
import style from '../style.css'


const options = [
  {
    name: 'Github',
    value: 'github',
  },
  {
    name: 'Open Source',
    value: 'open-source',
  },
  {
    name: 'Pilot',
    value: 'pilot',
  },
]

class RadioGroupState extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: 'github' }
  }

  componentWillMount () {
    if (this.props.success) {
      this.setState({ value: 'Pilot' })
    }
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
          onChange={v => this.setState({ value: v })}
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

RadioGroupState.defaultProps = {
  disabled: false,
  error: '',
  success: '',
}

storiesOf('Radio Group', module)
  .add('Default', () => (
    <div className={style.container}>
      <h2>Radio Button Group</h2>

      <section>
        <h3>Disabled</h3>
        <RadioGroupState name="disabled" disabled />
      </section>

      <section>
        <h3>Default</h3>
        <RadioGroupState name="default" />
      </section>

      <section>
        <h3>Success</h3>
        <RadioGroupState name="success" success="Sucesso!" />
      </section>

      <section>
        <h3>Error</h3>
        <RadioGroupState name="error" error="Erro!" />
      </section>
    </div>
  ))
