#### **Example** ####

``` jsx
const IconMenu = require('emblematic-icons/svg/Menu32.svg').default;
const Tag = require('../../src/Tag').default;
const SegmentedSwitch = require('../../src/SegmentedSwitch').default;

const items = [
  {
    value: 'minha-conta',
    title: 'Minha conta',
  },
  {
    value: 'transacoes',
    title: 'Transações',
  },
];

const sections = {
  title: 'Nome da empresa',
  showMsg: 'Mostrar saldo',
  hideMsg: 'Ocultar saldo',
  data: [
    {
      title: 'Disponível',
      value: <p><small>R$</small> 150000</p>,
      actionTitle: 'Sacar',
      action: () => {
      },
    },
    {
      title: 'A receber',
      value: <p><small>R$</small> 70000</p>,
      actionTitle: 'Antecipar',
      action: () => {
      },
    },
  ],
};

class SidebarState extends React.Component {
  constructor (props) {
    super(props)

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
            <img src="https://assets.pagar.me/site/general/logo-light-3812e7ea6b596bdcc8c041f0edc4ff15.png" alt="Pagar.me" />
          }
          <button onClick={() => this.setState({ collapsed: !collapsed })}>
            <IconMenu />
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
              title="Nome da empresa"
              subtitle={showInfos ? 'ocultar saldo' : 'mostrar saldo'}
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

<SidebarState />
```
