The Dropdown can have two styles: the default and the form styles.

First, to make the examples interactive, let's create a component
that will handle the interactions:

```jsx static
class DropdownState extends React.Component {
  constructor (props) {
    super(props)
    this.state = { selected: '' }
  }

  render () {
    return this.props.type === 'default'
      ? (
        <DropdownDefault
          options={options}
          name="things"
          onChange={event => this.setState({ selected: event.target.value })}
          value={this.state.selected}
          disabled={this.props.disabled}
          placeholder={this.props.placeholder}
        />
      )
      : (
        <DropdownForm
          options={options}
          name="things"
          onChange={event => this.setState({ selected: event.target.value })}
          value={this.state.selected}
          disabled={this.props.disabled}
          placeholder={this.props.placeholder}
          error={this.props.error}
        />
      )
  }
}

```

### __Default dropdown__ ###
#### **States** ####

Default
```jsx
  const
  DropdownState = require('./example/DropdownState').default;
  <div>
    <DropdownState size="tiny" />
    <br />
    <DropdownState />
    <br />
    <DropdownState placeholder="Placeholder" />
  </div>
```

Disabled
```jsx
  const DropdownState = require('./example/DropdownState').default;
  <div>
    <DropdownState size="tiny" disabled />
    <br />
    <DropdownState disabled />
    <br />
    <DropdownState
      disabled
      placeholder="Placeholder"
    />
  </div>
```

Error
```jsx
  const DropdownState = require('./example/DropdownState').default;
  <div>
    <DropdownState size="tiny" error="Error!" />
    <br />
    <DropdownState error="Error!" />
    <br />
    <DropdownState
      error="Error!"
      placeholder="Placeholder"
    />
  </div>
```

### __Form dropdown__ ###
#### **States** ####

Default
```jsx
  const DropdownState = require('./example/DropdownState').default;
  <div>
    <DropdownState type="form" />
    <br />
    <DropdownState
      type="form"
      placeholder="Placeholder"
    />
  </div>
```

Disabled
```jsx
  const DropdownState = require('./example/DropdownState').default;
  <div>
    <DropdownState
      disabled
      type="form"
    />
    <br />
    <DropdownState
      disabled
      type="form"
      placeholder="Placeholder"
    />
  </div>
```

Error
```jsx
  const DropdownState = require('./example/DropdownState').default;
  <div>
    <DropdownState
      type="form"
      error="Error!"
    />
    <br />
    <DropdownState
      error="Error!"
      type="form"
      placeholder="Placeholder"
    />
  </div>
```
