Default checkbox
```jsx
const Checkbox = require('./index').default;

class CheckState extends React.Component {
  constructor (props) {
    super(props)
    this.state = { checked: false }
  }

  render () {
    const {
      label,
      name,
      success,
      error,
      disabled,
    } = this.props

    const { checked } = this.state

    return (
      <Checkbox
        label={label}
        name={name}
        error={error}
        disabled={disabled}
        success={success}
        checked={checked}
        onChange={() => this.setState({ checked: !checked })}
      />
    )
  }
}

<div>
  <CheckState
    label="Example 1"
    name="example1"
  />

  <CheckState
    label="Example 2"
    name="example2"
    disabled
  />

  <CheckState
    label="Example 4"
    name="example4"
    error="Erro!"
  />


  <CheckState
    label="Example 5"
    name="example5"
    success="Success!"
  />
</div>
```

Form checkbox
```jsx
const CheckboxForm = require('./form').default;

class CheckState extends React.Component {
  constructor (props) {
    super(props)
    this.state = { checked: false }
  }

  render () {
    const {
      label,
      name,
      success,
      error,
      disabled,
    } = this.props

    const { checked } = this.state

    return (
      <CheckboxForm
        label={label}
        name={name}
        error={error}
        disabled={disabled}
        success={success}
        checked={checked}
        onChange={() => this.setState({ checked: !checked })}
      />
    )
  }
}

<div>
  <CheckboxForm
    label="Example 11"
    name="example11"
  />

  <CheckboxForm
    label="Example 12"
    name="example12"
    disabled
  />

  <CheckboxForm
    label="Example 13"
    name="example13"
    error="Error!"
  />

  <CheckboxForm
    label="Example 14"
    name="example14"
    success="Success!"
  />
</div>
```
