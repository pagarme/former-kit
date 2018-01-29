import React from 'react'

import { storiesOf } from '@storybook/react'

import CheckboxGroup from '../../src/CheckboxGroup'
import style from '../style.css'


class CheckboxGroupState extends React.Component {
  constructor (props) {
    super(props)

    this.state = { values: ['nerone'] }
  }

  render () {
    const options = [
      {
        label: 'Leo',
        value: 'leo',
      },
      {
        label: 'Nerone',
        value: 'nerone',
      },
      {
        label: 'hi',
        value: 'hi',
      },
    ]

    const {
      disabled,
      error,
      name,
      success,
    } = this.props

    return (
      <div>
        <CheckboxGroup
          disabled={disabled}
          error={error}
          name={name}
          onChange={values => this.setState({ values })}
          options={options}
          success={success}
          values={this.state.values}
        />

        <p>Selecionado: {this.state.values.join(', ')}</p>
      </div>
    )
  }
}

CheckboxGroupState.defaultProps = {
  disabled: false,
  error: '',
  success: '',
}

storiesOf('Checkbox Group', module)
  .add('Default', () => (
    <div className={style.container}>
      <h2>CheckboxGroup</h2>
      <section>
        <h3>Default</h3>
        <CheckboxGroupState name="default" />
      </section>

      <section>
        <h3>Disabled</h3>
        <CheckboxGroupState name="disabled" disabled />
      </section>

      <section>
        <h3>Success</h3>
        <CheckboxGroupState name="success" success="Eae sucesso" />
      </section>

      <section>
        <h3>Error</h3>
        <CheckboxGroupState name="error" error="Errou!" />
      </section>
    </div>
  ))
