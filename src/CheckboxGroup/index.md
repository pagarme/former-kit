First, let's create an wrapper component to handle
with state of the checkbox group.
``` jsx static
import React from 'react'
import CheckboxGroup from './'

class CheckboxGroupState extends React.Component {
  constructor (props) {
    super(props)

    this.state = { values: ['pagarme'] }
  }

  render () {
    const options = [
      {
        label: 'Github',
        value: 'Github',
      },
      {
        label: 'Pagar.me',
        value: 'pagarme',
      },
      {
        label: 'Open source',
        value: 'open-source',
      },
    ]

    const {
      disabled,
      error,
      name,
      success,
    } = this.props

    return (
      <CheckboxGroup
        disabled={disabled}
        error={error}
        name={name}
        onChange={values => this.setState({ values })}
        options={options}
        success={success}
        values={this.state.values}
      />
    )
  }
}
```

#### **States** ####

Default
```jsx
  const CheckboxGroupState = require('./examples/CheckboxGroupState').default;
  <div><CheckboxGroupState name="default" /></div>
```

Disabled
```jsx
  const CheckboxGroupState = require('./examples/CheckboxGroupState').default;
  <div><CheckboxGroupState name="disabled" disabled /></div>
```

Success
```jsx
  const CheckboxGroupState = require('./examples/CheckboxGroupState').default;
  <div><CheckboxGroupState name="success" success="Success!" /></div>
```

Error
```jsx
  const CheckboxGroupState = require('./examples/CheckboxGroupState').default;
  <div><CheckboxGroupState name="error" error="Error!" /></div>
```
