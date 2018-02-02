import React from 'react'
import IconAlert from 'react-icons/lib/md/add-alert'
import MdMessage from 'react-icons/lib/md/message'
import FaUser from 'react-icons/lib/fa/user-md'
import Avatar from '../../src/Avatar'

import {
  HeaderContent,
  HeaderLink,
  HeaderMenu,
} from '../../src/Header'

const HeaderContentExample = ({ photo }) => (
  <HeaderContent>
    <HeaderLink onClick={() => null}>
      <IconAlert size={24} />
    </HeaderLink>
    <HeaderLink
      onClick={() => null}
      icon={<MdMessage size={24} />}
    />
    <HeaderMenu onClick={() => null}>
      <Avatar photo={photo} icon={<FaUser size={24} />} />
      <span>Nome da Pessoa</span>
    </HeaderMenu>
  </HeaderContent>
)

export default HeaderContentExample
