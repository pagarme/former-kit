import React from 'react'
import { mount } from 'enzyme'
import MdKeyboardArrowLeft from 'react-icons/lib/md/keyboard-arrow-left'
import IconAlert from 'react-icons/lib/md/add-alert'
import IconArrowDown from 'react-icons/lib/md/arrow-downward'

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
          icon={<MdKeyboardArrowLeft />}
          onClick={() => {}}
        />

        <HeaderTitle>Transactions</HeaderTitle>
        <HeaderContent>
          <HeaderLink onClick={() => {}}>
            <IconAlert />
          </HeaderLink>
          <HeaderLink
            onClick={() => {}}
            icon={<IconAlert />}
          />
          <HeaderLink onClick={() => {}}>
            <div>
              <span>Nome da Pessoa</span>
              <IconArrowDown />
            </div>
          </HeaderLink>
        </HeaderContent>
      </Header>
    )
  })
})
