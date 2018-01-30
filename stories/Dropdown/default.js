import React from 'react'
import { storiesOf } from '@storybook/react'
import ArrowIcon from 'react-icons/lib/fa/angle-down'
import Dropdown from '../../src/Dropdown'

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
  .add('Default', () => (
    <div className={style.container}>
      <h2>Dropdown</h2>

      <section>
        <h3>Default</h3>
        <DropdownState />
      </section>

      <section>
        <h3>Disabled</h3>
        <DropdownState disabled />
      </section>

      <section>
        <h3>Default with placeholder</h3>
        <DropdownState placeholder="Selecione" />
      </section>

      <section>
        <h3>Disabled with placeholder</h3>
        <DropdownState disabled placeholder="Selecione" />
      </section>
    </div>
  ))
