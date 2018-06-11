import React from 'react'

import IconMenu from 'emblematic-icons/svg/Menu32.svg'
import IconHome from 'emblematic-icons/svg/Home32.svg'
import IconTransaction from 'emblematic-icons/svg/Transaction32.svg'
import shortid from 'shortid'

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarLinks,
  SidebarLink,
} from '../../Sidebar'

import Tag from '../../Tag'
import SegmentedSwitch from '../../SegmentedSwitch'

const items = [
  {
    value: 'my-account',
    title: 'My Account',
    icon: <IconHome width={16} height={16} />,
  },
  {
    value: 'transactions',
    title: 'Transactions',
    icon: <IconTransaction width={16} height={16} />,
  },
]

class SidebarState extends React.Component {
  constructor (props) {
    super(props)

    this.id = shortid.generate()

    this.state = {
      collapsed: false,
      selectedEnvironment: 'live',
      active: '',
    }

    this.handleEnvironment = this.handleEnvironment.bind(this)
  }

  handleEnvironment (env) {
    this.setState({
      selectedEnvironment: env,
    })
  }

  render () {
    const {
      collapsed,
      selectedEnvironment,
    } = this.state

    return (
      <Sidebar collapsed={collapsed}>
        <SidebarHeader>
          {!collapsed &&
            <img
              src="https://pagar.me/wp-content/uploads/2018/04/logo_pagarme.svg"
              width={120}
              alt="sidebar logo"
            />
          }
          <button onClick={() => this.setState({ collapsed: !collapsed })}>
            <IconMenu width="16" height="16" />
          </button>
        </SidebarHeader>

        <SidebarContent>
          {collapsed
            ? <Tag key={selectedEnvironment}>{selectedEnvironment}</Tag>
            : <SegmentedSwitch
              options={[
                {
                  title: 'Test',
                  value: 'test',
                },
                {
                  title: 'Live',
                  value: 'live',
                },
              ]}
              value={this.state.selectedEnvironment}
              name={`${this.id}-live-test`}
              onChange={this.handleEnvironment}
            />
          }
        </SidebarContent>

        <SidebarLinks>
          {items.map(item => (
            <SidebarLink
              key={item.value}
              title={item.title}
              active={item.value === this.state.active}
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
