Checkbox group example

```jsx
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

<div>
  <p><CheckboxGroupState name="default" /></p>
  <p><CheckboxGroupState name="disabled" disabled /></p>
  <p><CheckboxGroupState name="success" success="Success!" /></p>
  <p><CheckboxGroupState name="error" error="Error!" /></p>
</div>
```
