import React, { Component } from 'react'
import Button from '../../src/Button'
import Spacing from '../../src/Spacing'
import { Popover } from '../../src/Popover'
import Menu from './Menu'

import style from './style.css'

class PopoverControl extends Component {
  constructor () {
    super()

    this.state = {
      visible: true,
    }
  }

  render () {
    return (
      <div className={style.flex}>
        <Popover
          content={<Menu />}
          placement="bottomStart"
          visible={this.state.visible}
        >
          <Button>
            Open popover
          </Button>
        </Popover>

        <Spacing size="flex" />

        <Button onClick={() => this.setState({
            visible: false,
          })}
        >
          Close popover
        </Button>
      </div>
    )
  }
}

export default PopoverControl
