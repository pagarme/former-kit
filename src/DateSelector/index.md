Date selector example

```jsx
const moment = require('moment');

const presets = [
  {
    title: 'Last:',
    items: [
      {
        key: 'last-7',
        title: '7 days',
        date: () => -7,
      },
      {
        key: 'last-15',
        title: '15 days',
        date: () => -15,
      },
      {
        key: 'last-30',
        title: '30 days',
        date: () => -30,
      },
      {
        key: 'last-60',
        title: '60 days',
        date: () => -60,
      },
    ],
  },
]

class DateSelectorExample extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      dates: {
        start: moment(),
        end: moment(),
      },
      focusedInput: 'startDate',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleFocusChange = this.handleFocusChange.bind(this)
  }

  handleChange (dates) {
    this.setState({ dates })
  }

  handleFocusChange (focusedInput) {
    this.setState({ focusedInput })
  }

  render () {
    return (
      <DateSelector
        presets={presets}
        dates={this.state.dates}
        focusedInput={this.state.focusedInput}
        onFocusChange={this.handleFocusChange}
        onChange={this.handleChange}
        onConfirm={dates => action('onConfirm', dates)}
        onCancel={() => action('onCancel', '')}
      />
    )
  }
}


<DateSelectorExample />
```
