#### **Example** ####

``` jsx
const IconMenu = require('emblematic-icons/svg/Menu32.svg').default;
const IconConfig = require('emblematic-icons/svg/Configuration32.svg').default;
const IconHome = require('emblematic-icons/svg/Home32.svg').default;
const IconTransaction = require('emblematic-icons/svg/Transaction32.svg').default;

const shortid = require('shortid');
const { contains } = require('ramda');

const Tag = require('../../src/Tag').default;
const SegmentedSwitch = require('../../src/SegmentedSwitch').default;

const items = [
  {
    value: 'home',
    title: 'home',
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
              items={['live', 'test']}
              selected={this.state.selectedEnvironment}
              name={`${this.id}-live-test`}
              onChange={this.handleEnvironment}
            />
          }
        </SidebarContent>
      </Sidebar>
    )
  }
}

<SidebarState />
```
