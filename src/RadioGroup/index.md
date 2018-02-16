RadioGroup examples

``` jsx
const options = [
  {
    name: 'Prédio',
    value: 'predio',
  },
  {
    name: 'Casa',
    value: 'casa',
  },
  {
    name: 'Sofá',
    value: 'sofa',
  },
]

class RadioGroupState extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: 'casa' }
  }

  componentWillMount () {
    if (this.props.success) {
      this.setState({ value: 'sofa' })
    }
  }

  render () {
    const {
      disabled,
      error,
      name,
      success,
    } = this.props

    const {
      value,
    } = this.state

    return (
      <div>
        <RadioGroup
          options={options}
          name={name}
          onChange={event => this.setState({ value: event.target.value })}
          value={value}
          disabled={disabled}
          error={error}
          success={success}
        />

        <pre>Selecionado: {value}</pre>
      </div>
    )
  }
}

<RadioGroupState name="options" />
```
