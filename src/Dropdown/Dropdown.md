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
          success={this.props.success}
        />
      )
  }
}

```

The default Dropdown looks like this:
```jsx
const DropdownState = require('./example/DropdownState').default;
<DropdownState type="default" />
```

The form Dropdown looks like this:
```jsx
const DropdownState = require('./example/DropdownState').default;
<DropdownState type="form" />
```

The form Dropdown can show error and success messages:
```jsx
const DropdownState = require('./example/DropdownState').default;

<div>
  <DropdownState
    type="form"
    error="Error!"
  />

  <br />

  <DropdownState
    type="form"
    success="Success!"
  />
</div>
```

Both styles can have a placeholder:
```jsx
const DropdownState = require('./example/DropdownState').default;

<div>
  <DropdownState type="default" placeholder="Placeholder" />
  <br />
  <DropdownState type="form" placeholder="Placeholder" />
</div>
```

And both can have a disabled state:
```jsx
const DropdownState = require('./example/DropdownState').default;

<div>
  <DropdownState
    disabled
    type="default"
    placeholder="Placeholder"
  />

  <br />

  <DropdownState
    disabled
    type="default"
  />

  <br />

  <DropdownState
    disabled
    type="form"
    placeholder="Placeholder"
  />

  <br />

  <DropdownState
    disabled
    type="form"
  />
</div>
```


