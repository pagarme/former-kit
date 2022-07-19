import React from 'react'

import IconMenu from 'emblematic-icons/svg/Menu32.svg'
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
import Section from '../Section'
import style from './style.css'

const items = [
  {
    path: ['home'],
    title: 'Home',
    value: 'home',
  },
  {
    path: ['transactions'],
    title: 'Transactions',
    value: 'transactions',
  },
  {
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
  {
    path: ['config'],
    sublinks: [
      {
        path: ['config', 'profile'],
        title: 'Profile',
        value: 'profile',
      },
      {
        path: ['config', 'payment'],
        title: 'Payment',
        value: 'payment',
      },
    ],
    title: 'Config',
    value: 'config',
  },
]

class SidebarState extends React.Component {
  constructor (props) {
    super(props)

    this.id = shortid.generate()

    this.state = {
      active: [],
      collapsed: props.collapsed || false,
      itemData: items.map(item => ({ ...item, collapsed: false })),
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (link) {
    const { itemData } = this.state
    let newData = itemData
    if (link.sublinks) {
      newData = itemData.map((item) => {
        if (item.path === link.path) {
          return { ...item, collapsed: !item.collapsed }
        }
        return { ...item, collapsed: false }
      })
    }
    this.setState({
      active: link.path,
      itemData: newData,
    })
  }

  render () {
    const {
      active,
      collapsed,
      itemData,
    } = this.state

    return (
      <Section className={style.background}>
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
            {itemData.map(item => (
              <SidebarLink
                key={item.value}
                title={item.title.toUpperCase()}
                active={contains(item.value, active)}
                onClick={() => this.handleClick(item)}
                collapsed={item.collapsed}
              >
                {item.sublinks
                  && item.sublinks.map(sublink => (
                    <SidebarLink
                      active={contains(sublink.value, active)}
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
        </Sidebar>
      </Section>
    )
  }
}

export default SidebarState
