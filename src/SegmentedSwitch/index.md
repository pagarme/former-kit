SegmentedSwitch example

``` jsx
class SegmentedSwitchState extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selected: '',
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount () {
    this.setState({
      selected: this.props.selected,
    })
  }

  handleChange (value) {
    this.setState({ selected: value })
  }

  render () {
    return (
      <SegmentedSwitch
        items={this.props.items}
        onChange={this.handleChange}
        name={this.props.name}
        selected={this.state.selected}
      />
    )
  }
}

<SegmentedSwitchState
  items={['test', 'live']}
  selected="test"
  name="live-test"
/>
```
