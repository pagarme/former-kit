import React from 'react'

import IconMenu from 'emblematic-icons/svg/Menu32.svg'
import IconHome from 'emblematic-icons/svg/Home32.svg'
import IconTransaction from 'emblematic-icons/svg/Transaction32.svg'
import shortid from 'shortid'

import {
  Sidebar,
  SidebarHeader,
  SidebarLinks,
  SidebarLink,
} from '../../Sidebar'

const items = [
  {
    icon: <IconHome width={16} height={16} />,
    title: 'My Account',
    value: 'my-account',
  },
  {
    icon: <IconTransaction width={16} height={16} />,
    title: 'Transactions',
    value: 'transactions',
  },
]

class SidebarState extends React.Component {
  constructor (props) {
    super(props)

    this.id = shortid.generate()

    this.state = {
      active: '',
      collapsed: false,
    }
  }

  render () {
    const {
      active,
      collapsed,
    } = this.state

    return (
      <Sidebar collapsed={collapsed}>
        <SidebarHeader>
          {!collapsed && (
            <img
              alt="sidebar logo"
              src="https://pagar.me/wp-content/uploads/2018/04/logo_pagarme.svg"
              width={120}
            />
          )}
          <button
            onClick={() => this.setState({ collapsed: !collapsed })}
            type="button"
          >
            <IconMenu width="16" height="16" />
          </button>
        </SidebarHeader>

        <SidebarLinks>
          {items.map(item => (
            <SidebarLink
              key={item.value}
              title={item.title}
              active={item.value === active}
              onClick={() => this.setState({ active: item.value })}
              icon={item.icon}
              collapsed={collapsed}
            />
          ))}
        </SidebarLinks>
      </Sidebar>
    )
  }
}

export default SidebarState
