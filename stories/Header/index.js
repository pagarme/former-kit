import React from 'react'
import { storiesOf } from '@storybook/react'

import HeaderContentExample from './HeaderContentExample'

import {
  Header,
  HeaderBackButton,
  HeaderTitle,
} from '../../src/Header'

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
