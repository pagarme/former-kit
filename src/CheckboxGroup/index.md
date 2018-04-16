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
        value: 'github',
      },
      {
        label: 'Open Source',
        value: 'open-source',
      },
      {
        label: 'Pilot',
        value: 'pilot',
      },
      {
        label: 'React',
        value: 'react',
      },
      {
        label: 'Storybook',
        value: 'Storybook',
      },
    ]

    const {
      disabled,
      error,
      name,
    } = this.props

    return (
      <CheckboxGroup
        columns={2]}
        disabled={disabled}
        error={error}
        name={name}
        onChange={values => this.setState({ values })}
        options={options}
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

Error
```jsx
  const CheckboxGroupState = require('./examples/CheckboxGroupState').default;
  <div><CheckboxGroupState name="error" error="Error!" /></div>
```

Disabled
```jsx
  const CheckboxGroupState = require('./examples/CheckboxGroupState').default;
  <div><CheckboxGroupState name="disabled" disabled /></div>
```
