import React from 'react'

import IconConfig from 'emblematic-icons/svg/Configuration32.svg'
import IconHome from 'emblematic-icons/svg/Home32.svg'
import IconMenu from 'emblematic-icons/svg/Menu32.svg'
import IconTransaction from 'emblematic-icons/svg/Transaction32.svg'
import shortid from 'shortid'
import { contains } from 'ramda'

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarLinks,
  SidebarLink,
} from '../../src/Sidebar'

import Tag from '../../src/Tag'
import SegmentedSwitch from '../../src/SegmentedSwitch'

import Logo from './logo.svg'

const items = [
  {
    value: 'home',
    title: 'Home',
    path: ['home'],
    icon: <IconHome width={16} height={16} />,
  },
  {
    value: 'transactions',
    title: 'Transactions',
    path: ['transactions'],
    icon: <IconTransaction width={16} height={16} />,
  },
  {
    value: 'account',
    title: 'My Account',
    icon: <IconConfig width={16} height={16} />,
    path: ['account'],
    sublinks: [
      {
        value: 'general',
        title: 'General',
        path: ['account', 'general'],
      },
      {
        value: 'user',
        title: 'User',
        path: ['account', 'user'],
      },
    ],
  },
]

class SidebarState extends React.Component {
  constructor (props) {
    super(props)

    this.id = shortid.generate()

    this.state = {
      collapsed: props.collapsed || false,
      selectedEnvironment: 'live',
      active: [],
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleEnvironment = this.handleEnvironment.bind(this)
  }

  handleEnvironment (env) {
    this.setState({
      selectedEnvironment: env,
    })
  }

  handleClick (link) {
    this.setState({
      active: link.path,
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
            <Logo width="140" />
          }
          <button onClick={() => this.setState({ collapsed: !collapsed })}>
            <IconMenu width="16" height="16" />
          </button>
        </SidebarHeader>

        <SidebarLinks>
          {items.map(item => (
            <SidebarLink
              key={item.value}
              title={item.title}
              active={contains(item.value, this.state.active)}
              onClick={() => this.handleClick(item)}
              icon={item.icon}
              collapsed={collapsed}
            >
              {item.sublinks &&
                item.sublinks.map(sublink => (
                  <SidebarLink
                    active={contains(sublink.value, this.state.active)}
                    key={sublink.value}
                    onClick={() => this.handleClick(sublink)}
                    title={sublink.title}
                    value={sublink.value}
                  />
                ))
              }
            </SidebarLink>
          ))}
        </SidebarLinks>

        <SidebarContent>
          {collapsed
            ? <Tag key={selectedEnvironment}>{selectedEnvironment}</Tag>
            : <SegmentedSwitch
              name={`${this.id}-live-test`}
              onChange={this.handleEnvironment}
              options={[
                {
                  title: 'Live',
                  value: 'live',
                },
                {
                  title: 'Test',
                  value: 'test',
                },
              ]}
              value={this.state.selectedEnvironment}
            />
          }
        </SidebarContent>
      </Sidebar>
    )
  }
}

export default SidebarState
