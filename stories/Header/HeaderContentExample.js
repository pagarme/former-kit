import React from 'react'
import IconAlert from 'emblematic-icons/svg/Alert24.svg'
import IconMessage from 'emblematic-icons/svg/Support24.svg'
import Avatar from '../../src/Avatar'

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
    <HeaderMenu onClick={() => null}>
      <Avatar photo={photo} />
      <span>Current username</span>
    </HeaderMenu>
  </HeaderContent>
)

export default HeaderContentExample
