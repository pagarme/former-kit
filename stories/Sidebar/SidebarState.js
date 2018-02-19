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
  SidebarSections,
} from '../../src/Sidebar'

import Tag from '../../src/Tag'
import SegmentedSwitch from '../../src/SegmentedSwitch'

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

const sections = {
  title: 'Pagar.me',
  showMsg: 'Show balance',
  hideMsg: 'Hide balance',
  data: [
    {
      title: 'Available',
      value: <p><small>R$</small> 150000</p>,
      actionTitle: 'Withdraw',
      action: () => {
      },
    },
    {
      title: 'To receive',
      value: <p><small>R$</small> 70000</p>,
      actionTitle: 'Antecipate',
      action: () => {
      },
    },
  ],
}

class SidebarState extends React.Component {
  constructor (props) {
    super(props)

    this.id = shortid.generate()

    this.state = {
      collapsed: false,
      selectedEnvironment: 'live',
      active: '',
      showInfos: false,
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
      showInfos,
    } = this.state

    return (
      <Sidebar collapsed={collapsed}>
        <SidebarHeader>
          {!collapsed &&
            <img
              src="https://assets.pagar.me/site/general/logo-light-3812e7ea6b596bdcc8c041f0edc4ff15.png"
              alt="Pagar.me"
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
              items={['live', 'test']}
              selected={this.state.selectedEnvironment}
              name={`${this.id}-live-test`}
              onChange={this.handleEnvironment}
            />
          }
        </SidebarContent>

        <SidebarLinks>
          {!collapsed &&
            <SidebarLink
              title={sections.title}
              subtitle={showInfos ? 'hide balance' : 'show balance'}
              active={showInfos}
              onClick={() => this.setState({ showInfos: !showInfos })}
            >
              <SidebarSections sections={sections.data} />
            </SidebarLink>
          }

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
