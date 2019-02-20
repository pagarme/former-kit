### Card example
```jsx
const Icon = require('emblematic-icons/svg/Calendar32.svg').default;

<Card>
  <CardGraphic>
    <img
      src="https://maxicharts.com/wp-content/uploads/2017/07/banner-1544x500.png"
      alt="placeholder"
    />
  </CardGraphic>
  <CardTitle
    title="Lorem ipsum dolor sit amet"
    icon={<Icon width={16} height={16} />}
  />
  <CardContent>
    <p>Lorem ipsum dolor sit amet, consectetur</p>

    <CardSection
      title="Lorem ipsum dolor sit amet"
    >
      <CardContent>
        loremIpsum
      </CardContent>
    </CardSection>
  </CardContent>
  <CardActions>
    <Button>Action</Button>
    <Button>Action</Button>
    <Button>Action</Button>
    <Button>Action</Button>
  </CardActions>
</Card>
```

### CardSectionDoubleLineTitle

```jsx
const { Fragment, Component } = require('react');
const IconCalendar = require('emblematic-icons/svg/Calendar32.svg').default;

const {
  Popover,
  PopoverMenu,
} = require('../Popover');

const items = [
  {
    title: 'Minha Conta',
    action: () => null,
  },
  {
    title: 'Logout',
    action: () => null,
  },
];

const renderActions = () => (
  <Fragment>
    <Button
      fill="outline"
      icon={<IconCalendar width={16} height={16} />}
      key="Item 1"
      onClick={() => null}
      size="default"
    />

    <Fragment>
      <Popover
        content={
          <Fragment>
            <div>
              <strong>Teste</strong>
            </div>
            <PopoverMenu items={items} />
          </Fragment>
        }
      >
        <Button
          fill="outline"
          onClick={() => null}
          size="default"
        >
          Actions
        </Button>
      </Popover>
    </Fragment>
  </Fragment>
)

class CardSectionDoubleLineTitleState extends Component {
  constructor () {
    super()

    this.state = { collapsed: false }
  }

  render () {
    return (
      <div>
        <Card>
          <CardTitle title="Lorem title" />

          <CardContent>
            <CardSection>
              <CardSectionDoubleLineTitle
                actions={renderActions()}
                collapsed={this.state.collapsed}
                icon={<IconCalendar width={16} height={16} />}
                onClick={
                  () => this.setState({ collapsed: !this.state.collapsed })
                }
                subtitle="Verifique ou edite as informações da sua empresa"
                title={this.state.collapsed ? 'Title collapsed' : 'Title opened'}
              />
              {!this.state.collapsed &&
                <CardContent>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                  venenatis placerat lacus et pretium. Aenean porttitor mi odio, vel
                  blandit nulla malesuada et. Duis a tellus quis est iaculis accumsan.
                  In diam est, egestas eu lobortis eu, laoreet ut tortor. Sed mattis
                  sapien vel malesuada sodales. Curabitur hendrerit purus sed ex
                  feugiat hendrerit. Vivamus eleifend odio a congue consectetur.
                </CardContent>
              }
            </CardSection>
          </CardContent>
        </Card>
      </div>
    )
  }
}

<CardSectionDoubleLineTitleState />
```

