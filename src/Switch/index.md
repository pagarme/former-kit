#### **Example** ####

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
        checked={this.state.value}
        disabled={this.props.disabled}
        name={'switch'}
        onChange={value => this.setState({ value })}
      />
    )
  }
}

<SwitchState checked />
```
