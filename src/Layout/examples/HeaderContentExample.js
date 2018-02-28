import React from 'react'
import PropTypes from 'prop-types'
import IconAlert from 'emblematic-icons/svg/Alert24.svg'
import IconMessage from 'emblematic-icons/svg/Support24.svg'
import Avatar from '../../Avatar'

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
    <HeaderMenu onClick={() => null}>
      <Avatar photo={photo} />
      <span>Nome da Pessoa</span>
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
