import React, { Fragment } from 'react'
import { action } from '@storybook/addon-actions'
import { PopoverMenu } from '../../src/Popover'

const items = [
  {
    title: 'Minha Conta',
    action: () => action('account'),
  },
  {
    title: 'Logout',
    action: () => action('logout'),
  },
]

const Menu = () => (
  <Fragment>
    <div style={{ padding: 16 }}>
      <strong>test@email.com</strong>
      <small>Admin</small>
    </div>
    <PopoverMenu items={items} />
  </Fragment>
)

export default Menu
