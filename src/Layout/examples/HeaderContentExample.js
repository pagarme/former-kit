import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import IconAlert from 'emblematic-icons/svg/Alert24.svg'
import IconMessage from 'emblematic-icons/svg/Support24.svg'
import Avatar from '../../Avatar'
import { PopoverMenu } from '../../Popover'

import {
  HeaderContent,
  HeaderLink,
  HeaderMenu,
  Header,
  HeaderTitle,
} from '../../Header'

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
          { title: 'Account', action: () => null },
          { title: 'Logout', action: () => null },
        ]}
      />
    </HeaderMenu>
  </HeaderContent>
)

const HeaderExample = () => (
  <Header>
    <HeaderTitle>Transactions</HeaderTitle>
    <HeaderContentExample />
  </Header>
)

HeaderContentExample.propTypes = {
  photo: PropTypes.string,
}

HeaderContentExample.defaultProps = {
  photo: '',
}

export default HeaderExample
