First, let's create an wrapper component to handle
with state of the checkbox.
``` jsx static
import React from 'react'
import Checkbox from './'

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
      value,
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
        value={value}
      />
    )
  }
}
```

### __Default checkbox__ ###
#### **States** ####

Default
```jsx
  const CheckState = require('./examples/CheckboxState').default;
  <CheckState
    label="Example 1"
    name="example1"
  />
```

Disabled
```jsx
  const CheckState = require('./examples/CheckboxState').default;
  <CheckState
    label="Example 2"
    name="example2"
    disabled
  />
```

Error
```jsx
  const CheckState = require('./examples/CheckboxState').default;
  <CheckState
    label="Example 4"
    name="example4"
    error="Error!"
  />
```

Success
```jsx
  const CheckState = require('./examples/CheckboxState').default;
  <CheckState
    label="Example 5"
    name="example5"
    success="Success!"
  />
```

Now, let's create an wrapper component to handle
with state of the checkbox form.
``` jsx static
import React from 'react'
import CheckboxForm from './form'

class CheckboxFormState extends React.Component {
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
      value,
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
        value={value}
      />
    )
  }
}

```
### __Form checkbox__ ###
#### **States** ####

Default
```jsx
const CheckboxFormState = require('./examples/CheckboxForm').default;
  <CheckboxFormState
    label="Example 11"
    name="example11"
  />
```

Disabled
```jsx
const CheckboxFormState = require('./examples/CheckboxForm').default;
  <CheckboxFormState
    label="Example 12"
    name="example12"
    disabled
  />
```

Error
```jsx
const CheckboxFormState = require('./examples/CheckboxForm').default;
  <CheckboxFormState
    label="Example 13"
    name="example13"
    error="Error!"
  />
```

Success
```jsx
const CheckboxFormState = require('./examples/CheckboxForm').default;
  <CheckboxFormState
    label="Example 14"
    name="example14"
    success="Success!"
  />
```
