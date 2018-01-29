import React from 'react'
import { mount } from 'enzyme'
import MdMenu from 'react-icons/lib/md/menu'

import {
  Sidebar,
  SidebarHeader,
} from './index'

class SidebarComponent extends React.Component {
  constructor () {
    super()

    this.state = {
      collapsed: false,
    }
  }

  render () {
    const {
      collapsed,
    } = this.state

    return (
      <Sidebar collapsed={collapsed}>
        <SidebarHeader>
          {!collapsed &&
            <img src="https://assets.pagar.me/site/general/logo-light-3812e7ea6b596bdcc8c041f0edc4ff15.png" alt="Pagar.me" />
          }
          <button onClick={() => this.setState({ collapsed: !collapsed })}>
            <MdMenu />
          </button>
        </SidebarHeader>
      </Sidebar>
    )
  }
}

describe('Sidebar', () => {
  it('should mount', () => {
    mount(<SidebarComponent />)
  })

  it('should collapse sidebar when menu button is clicked', () => {
    const component = mount(<SidebarComponent />)
    component.find('button').first().simulate('click')
    expect(component.state('collapsed')).toBeTruthy()
  })
})
