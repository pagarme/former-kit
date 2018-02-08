import React from 'react'
import { storiesOf } from '@storybook/react'
import Dropdown from '../../src/Dropdown'

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
          name="things"
          onChange={value => this.setState({ selected: value })}
          value={this.state.selected}
          disabled={this.props.disabled}
          placeholder={this.props.placeholder}
          error={this.props.error}
          success={this.props.success}
        />
        <p>Selected: {this.state.selected}</p>
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
