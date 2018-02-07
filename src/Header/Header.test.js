import React from 'react'
import { mount } from 'enzyme'

import {
  Header,
  HeaderBackButton,
  HeaderContent,
  HeaderLink,
  HeaderTitle,
} from './index'

describe('Header', () => {
  it('should mount', () => {
    mount(
      <Header>
        <HeaderBackButton
          onClick={() => {}}
        />

        <HeaderTitle>Transactions</HeaderTitle>
        <HeaderContent>
          <HeaderLink onClick={() => {}}>
            <svg />
          </HeaderLink>
          <HeaderLink
            onClick={() => {}}
            icon={<svg />}
          />
          <HeaderLink onClick={() => {}}>
            <div>
              <span>Nome da Pessoa</span>
              <svg />
            </div>
          </HeaderLink>
        </HeaderContent>
      </Header>
    )
  })
})
