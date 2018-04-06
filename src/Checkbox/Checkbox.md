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

Error
```jsx
  const CheckState = require('./examples/CheckboxState').default;
  <CheckState
    label="Example 4"
    name="example4"
    error="Error!"
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
