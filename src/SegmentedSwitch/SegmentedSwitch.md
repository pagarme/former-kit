#### **Example** ####

You can create this element using two differents styles: default and spaced.

### __Default__ ###

``` jsx
const IconChart = require('emblematic-icons/svg/TrendingUp32.svg').default;
const IconTable = require('emblematic-icons/svg/Menu32.svg').default;
const SegmentedSwitch = require('./Spaced').default;

class SegmentedSwitchState extends React.Component {
  constructor () {
    super()

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

  handleChange (selected) {
    this.setState({ selected })
  }

  render () {
    return (
      <SegmentedSwitch
        name={this.props.name}
        onChange={this.handleChange}
        options={this.props.options}
        value={this.state.selected}
      />
    )
  }
}

<div style={{
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-around',
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

### __Spaced__ ###

``` jsx
const IconChart = require('emblematic-icons/svg/TrendingUp32.svg').default;
const IconLock = require('emblematic-icons/svg/Lock32.svg').default;
const IconTable = require('emblematic-icons/svg/Menu32.svg').default;
const SpacedSegmentedSwitch = require('./Spaced').default;

class SpacedSegmentedSwitchState extends React.Component {
  constructor () {
    super()

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

  handleChange (selected) {
    this.setState({ selected })
  }

  render () {
    return (
      <SpacedSegmentedSwitch
        name={this.props.name}
        onChange={this.handleChange}
        options={this.props.options}
        value={this.state.selected}
      />
    )
  }
}

<div style={{
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-around',
}}>
  <SpacedSegmentedSwitchState
    name="money-test"
    options={[
      {
        title: 'From $0 to $25',
        value: 'from0to25',
      },
      {
        title: 'From $25 to $50',
        value: 'from25to100',
      },
      {
        title: 'From $50 to $100',
        value: 'from50to100',
      },
    ]}
    value="from25to100"
  />

  <SpacedSegmentedSwitchState
    name="spaced-table-chart"
    options={[
      {
        title: <IconTable width={16} height={16} />,
        value: 'table',
      },
      {
        title: <IconChart width={16} height={16} />,
        value: 'chart',
      },
      {
        title: <IconLock width={16} height={16} />,
        value: 'lock',
      },
    ]}
    value="table"
  />
</div>
```
