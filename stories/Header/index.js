import React from 'react'
import { storiesOf } from '@storybook/react'

import Section from '../Section'
import HeaderContentExample from './HeaderContentExample'

import {
  Header,
  HeaderBackButton,
  HeaderTitle,
} from '../../src/Header'

storiesOf('Header', module)
  .add('Default', () => (
    <div style={{ background: '#e4e4e4', height: '100vh' }}>
      <Section title="With title">
        <Header>
          <HeaderTitle>Transactions</HeaderTitle>
        </Header>
      </Section>

      <Section title="Primary nivel">
        <Header>
          <HeaderTitle>Transactions</HeaderTitle>
          <HeaderContentExample />
        </Header>
      </Section>

      <Section title="Secondary nivel">
        <Header>
          <HeaderBackButton
            onClick={() => null}
          />

          <HeaderTitle>Transactions</HeaderTitle>
          <HeaderContentExample photo="https://i.imgur.com/2vp5kTT.jpg" />
        </Header>
      </Section>
    </div>
  ))
