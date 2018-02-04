import React from 'react'
import { storiesOf } from '@storybook/react'
import IconAlert from 'react-icons/lib/md/add-alert'
import MdMessage from 'react-icons/lib/md/message'
import FaUser from 'react-icons/lib/fa/user-md'
import IconArrowDown from 'react-icons/lib/md/arrow-downward'

import {
  Header,
  HeaderBackButton,
  HeaderContent,
  HeaderLink,
  HeaderTitle,
  HeaderMenu,
} from '../../src/Header'
import Avatar from '../../src/Avatar'

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
      <Avatar photo={photo} />
      <span>Nome da Pessoa</span>
    </HeaderMenu>
  </HeaderContent>
)

storiesOf('Header', module)
  .add('defaultTheme', () => (
    <div style={{ background: '#e4e4e4', height: '100vh' }}>
      <div>
        <h3 style={{ margin: 0, padding: 15 }}>Apenas título</h3>
        <Header>
          <HeaderTitle>Transactions</HeaderTitle>
        </Header>
      </div>

      <div>
        <h3 style={{ margin: 0, padding: 15 }}>Primeiro nível</h3>
        <Header>
          <HeaderTitle>Transactions</HeaderTitle>
          <HeaderContentExample />
        </Header>
      </div>

      <div>
        <h3 style={{ margin: 0, padding: 15 }}>Segundo nível</h3>
        <Header>
          <HeaderBackButton
            onClick={() => null}
          />

          <HeaderTitle>Transactions</HeaderTitle>
          <HeaderContentExample photo="https://i.imgur.com/2vp5kTT.jpg" />
        </Header>
      </div>
    </div>
  ))
