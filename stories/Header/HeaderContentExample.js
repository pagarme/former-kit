import React, { Fragment } from 'react'
import { action } from '@storybook/addon-actions'
import IconAlert from 'emblematic-icons/svg/Alert24.svg'
import IconMessage from 'emblematic-icons/svg/Support24.svg'
import Avatar from '../../src/Avatar'
import { PopoverMenu } from '../../src/Popover'

import {
  HeaderContent,
  HeaderLink,
  HeaderMenu,
} from '../../src/Header'

const HeaderContentExample = ({ photo }) => (
  <HeaderContent>
    <HeaderLink onClick={() => null}>
      <IconAlert />
    </HeaderLink>
    <HeaderLink
      onClick={() => null}
      icon={<IconMessage />}
    />
    <HeaderMenu
      title={
        <Fragment>
          <Avatar alt="alt text" photo={photo} />
          <span>Current username</span>
        </Fragment>
      }
      onClick={() => null}
    >
      <div>
        <strong>e.mail@pagar.me</strong>
        <small>admin</small>
      </div>
      <PopoverMenu
        items={[
          { title: 'Account', action: action('account') },
          { title: 'Logout', action: action('logout') },
        ]}
      />
    </HeaderMenu>
  </HeaderContent>
)

export default HeaderContentExample
