#### **Example** ####

``` jsx
const IconTable = require('emblematic-icons/svg/Menu32.svg').default;
const IconChart = require('emblematic-icons/svg/TrendingUp32.svg').default;

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
      selected: this.props.value,
    })
  }

  handleChange (value) {
    this.setState({ selected: value })
  }

  render () {
    return (
      <SegmentedSwitch
        options={this.props.options}
        onChange={this.handleChange}
        name={this.props.name}
        value={this.state.selected}
      />
    )
  }
}

<div style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around'
}}>
  <SegmentedSwitchState
    name="live-test"
    options={[
      {
        title: 'Test',
        value: 'test',
      },
      {
        title: 'Live',
        value: 'live',
      },
    ]}
    value="test"
  />

  <SegmentedSwitchState
    name="super-extra-options"
    options={[
      {
        title: 'Test',
        value: 'test',
      },
      {
        title: 'Live',
        value: 'live',
      },
      {
        title: 'Super Test',
        value: 'super-test',
      },
      {
        title: 'Extra Live',
        value: 'extra-live',
      },
    ]}
    value="super-test"
  />

  <SegmentedSwitchState
    name="table-chart"
    options={[
      {
        title: <IconTable width={16} height={16} />,
        value: 'table',
      },
      {
        title: <IconChart width={16} height={16} />,
        value: 'chart',
      },
    ]}
    value="table"
  />
</div>
```
