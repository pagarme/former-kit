TabBar example

``` jsx
class Tab extends React.Component {
  constructor (props) {
    super(props)
    this.state = { selected: 1 }
    this.changeTab = this.changeTab.bind(this)
  }

  changeTab (selected) {
    this.setState({ selected })
  }

  render () {
    return (
      <TabBar
        variant={this.props.variant}
        selected={this.state.selected}
        onTabChange={this.changeTab}
      >
        <TabItem text="My Account">
          <h2>My Account</h2>
        </TabItem>
        <TabItem text="Documentation" >
          <h2>Documentation</h2>
        </TabItem>
        <TabItem text="Pilot">
          <h2>Pilot</h2>
        </TabItem>
      </TabBar>
    )
  }
}

<Tab variant="just-text" />
```
