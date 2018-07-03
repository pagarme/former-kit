import React, { Fragment } from 'react'
import { action } from '@storybook/addon-actions'
import { PopoverMenu, PopoverContent } from '../../src/Popover'

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
    <PopoverContent>
      <strong>test@email.com</strong>
      <small>Admin</small>
    </PopoverContent>
    <PopoverMenu items={items} />
  </Fragment>
)

export default Menu
