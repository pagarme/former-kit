Switch examples

``` jsx
class SwitchState extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: props.checked,
    }
  }

  render () {
    return (
      <Switch
        disabled={this.props.disabled}
        checked={this.state.value}
        onChange={value => this.setState({ value })}
      />
    )
  }
}

<SwitchState checked />
```
