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
  SidebarLinks,
  SidebarLink,
} from '../../src/Sidebar'

import Button from '../../src/Button'

import Logo from './logo.svg'

const items = [
  {
    icon: <IconHome width={16} height={16} />,
    path: ['home'],
    title: 'Home',
    value: 'home',
  },
  {
    icon: <IconTransaction width={16} height={16} />,
    path: ['transactions'],
    title: 'Transactions',
    value: 'transactions',
  },
  {
    icon: <IconConfig width={16} height={16} />,
    path: ['account'],
    sublinks: [
      {
        path: ['account', 'general'],
        title: 'General',
        value: 'general',
      },
      {
        path: ['account', 'user'],
        title: 'User',
        value: 'user',
      },
    ],
    title: 'My Account',
    value: 'account',
  },
]

class SidebarState extends React.Component {
  constructor (props) {
    super(props)

    this.id = shortid.generate()

    this.state = {
      active: [],
      collapsed: props.collapsed || false,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (link) {
    this.setState({
      active: link.path,
    })
  }

  render () {
    const {
      active,
      collapsed,
    } = this.state

    return (
      <Sidebar collapsed={collapsed}>
        <SidebarHeader>
          { !collapsed && <Logo width="140" /> }
          <Button
            onClick={() => this.setState({ collapsed: !collapsed })}
            icon={<IconMenu width={16} height={16} />}
            fill="clean"
            relevance="low"
          />
        </SidebarHeader>

        <SidebarLinks>
          {items.map(item => (
            <SidebarLink
              key={item.value}
              title={item.title}
              active={contains(item.value, active)}
              onClick={() => this.handleClick(item)}
              icon={item.icon}
              collapsed={collapsed}
            >
              {item.sublinks
                && item.sublinks.map(sublink => (
                  <SidebarLink
                    active={contains(sublink.value, active)}
                    key={sublink.value}
                    onClick={() => this.handleClick(sublink)}
                    title={sublink.title}
                    value={sublink.value}
                    borderButton
                  />
                ))
              }
            </SidebarLink>
          ))}
        </SidebarLinks>
      </Sidebar>
    )
  }
}

export default SidebarState
