import React from 'react'
import { storiesOf } from '@storybook/react'
import Dropdown from '../../src/Dropdown/form'
import style from '../style.css'

const options = [
  {
    name: 'Leonardo',
    value: 'leonardo',
  },
  {
    name: 'Derek',
    value: 'derek',
  },
  {
    name: 'Lucas',
    value: 'lucas',
  },
]

class DropdownState extends React.Component {
  constructor (props) {
    super(props)
    this.state = { selected: '' }
  }

  render () {
    return (
      <div>
        <Dropdown
          options={options}
          name="pessoas"
          label="Pessoas da Pagarme"
          onChange={value => this.setState({ selected: value })}
          value={this.state.selected}
          disabled={this.props.disabled}
          placeholder={this.props.placeholder}
          error={this.props.error}
          success={this.props.success}
        />

        <p>Selecionado: {this.state.selected}</p>
      </div>
    )
  }
}

DropdownState.defaultProps = {
  disabled: false,
  error: '',
  success: '',
  placeholder: '',
}

storiesOf('Dropdown', module)
  .add('Form', () => (
    <div className={style.container}>
      <h2>Dropdown</h2>

      <section>
        <h3>Default</h3>
        <DropdownState />
      </section>

      <section>
        <h3>With placeholder</h3>
        <DropdownState placeholder="Selecione alguem" />
      </section>

      <section>
        <h3>Disabled with placeholder</h3>
        <DropdownState disabled placeholder="Selecione alguem" />
      </section>

      <section>
        <h3>Disabled</h3>
        <DropdownState disabled />
      </section>

      <section>
        <h3>Error</h3>
        <DropdownState error="Something went wrong" />
      </section>

      <section>
        <h3>Success</h3>
        <DropdownState success="Something went well" />
      </section>
    </div>
  ))

