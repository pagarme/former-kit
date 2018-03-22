The Input can have two styles: the default and the form styles.

First, let's declare a component that will make the Input examples interactive:
```jsx static
class InputState extends React.Component {
  constructor (props) {
    super(props)
    this.state = { email: 'Pagarme' }
  }

  render () {
    const {
      error,
      icon,
      multiline,
      type,
      inputStyle,
      label,
      hint,
      disabled,
    } = this.props

    const {
      email,
    } = this.state

    return inputStyle !== 'form'
      ? (
        <DefaultInput
          error={error}
          hint={hint}
          icon={icon}
          label={label}
          multiline={multiline}
          name="email"
          onChange={e => this.setState({ email: e.target.value })}
          placeholder="name@email.com"
          type={type}
          value={email}
          disabled={disabled}
        />
      )
      : (
        <FormInput
          error={error}
          hint={hint}
          icon={icon}
          label={label}
          multiline={multiline}
          name="email"
          onChange={e => this.setState({ email: e.target.value })}
          placeholder="nome@email.com"
          type={type}
          value={email}
          disabled={disabled}
        />
      )
  }
}
```

### __Default input__ ###
#### **States** ####

Default
```jsx
  const InputState = require('./example/InputState').default;
  const IconMail = require('emblematic-icons/svg/Mail32.svg').default;

  <div>
    <InputState
      type="text"
      label="Email!"
    />
    <br />
    <InputState
      inputStyle="default"
      type="text"
      label="Email!"
      hint="Hint!"
    />
    <br />
    <InputState
      inputStyle="default"
      type="text"
      label="Email!"
      hint="Hint!"
      icon={<IconMail width={16} height={16} />}
    />
    <br />
    <InputState
      inputStyle="default"
      type="password"
      label="Password"
      hint="Hint!"
    />
    <br />
    <InputState
      inputStyle="default"
      type="text"
      label="Email!"
      hint="Hint!"
      multiline
    />
  </div>
```

Disabled
```jsx
  const InputState = require('./example/InputState').default;
  const IconMail = require('emblematic-icons/svg/Mail32.svg').default;
  <div>
    <InputState
      disabled
      type="text"
      label="Email!"
    />
    <br />
    <InputState
      type="text"
      label="Email!"
      hint="Hint!"
      disabled
    />
    <br />
    <InputState
      disabled
      type="text"
      label="Email!"
      hint="Hint!"
      icon={<IconMail width={16} height={16} />}
    />
    <br />
    <InputState
      disabled
      type="password"
      label="Password"
      hint="Hint!"
    />
    <br />
    <InputState
      disabled
      type="text"
      label="Email!"
      hint="Hint!"
      multiline
    />
  </div>
```

Error
```jsx
  const InputState = require('./example/InputState').default;
  const IconMail = require('emblematic-icons/svg/Mail32.svg').default;
  <div>
    <InputState
      type="text"
      label="Email!"
      error="Error!"
    />
    <br />
    <InputState
      type="text"
      label="Email!"
      hint="Hint!"
      error="Error!"
    />
    <br />
    <InputState
      type="text"
      label="Email!"
      hint="Hint!"
      error="Error!"
      icon={<IconMail width={16} height={16} />}
    />
    <br />
    <InputState
      type="password"
      label="Password"
      hint="Hint!"
      error="Error!"
    />
    <br />
    <InputState
      type="text"
      label="Email!"
      hint="Hint!"
      error="Error!"
      multiline
    />
  </div>
```

### __Form input__ ###
#### **States** ####

Default
```jsx
  const InputState = require('./example/InputState').default;
  const IconMail = require('emblematic-icons/svg/Mail32.svg').default;
  <div>
    <InputState
      inputStyle="form"
      type="text"
      label="Email!"
    />
    <br />
    <InputState
      inputStyle="form"
      type="text"
      label="Email!"
      hint="Hint!"
    />
    <br />
    <InputState
      inputStyle="form"
      type="text"
      label="Email!"
      hint="Hint!"
      icon={<IconMail width={16} height={16} />}
    />
    <br />
    <InputState
      inputStyle="form"
      type="password"
      label="Password"
      hint="Hint!"
    />
    <br />
    <InputState
      inputStyle="form"
      type="text"
      label="Email!"
      hint="Hint!"
      multiline
    />
  </div>
```

Disabled
```jsx
  const InputState = require('./example/InputState').default;
  const IconMail = require('emblematic-icons/svg/Mail32.svg').default;
  <div>
    <InputState
      disabled
      inputStyle="form"
      type="text"
      label="Email!"
    />
    <br />
    <InputState
      inputStyle="form"
      type="text"
      label="Email!"
      hint="Hint!"
      disabled
    />
    <br />
    <InputState
      inputStyle="form"
      disabled
      type="text"
      label="Email!"
      hint="Hint!"
      icon={<IconMail width={16} height={16} />}
    />
    <br />
    <InputState
      inputStyle="form"
      disabled
      type="password"
      label="Password"
      hint="Hint!"
    />
    <br />
    <InputState
      inputStyle="form"
      disabled
      type="text"
      label="Email!"
      hint="Hint!"
      multiline
    />
  </div>
```

Error
```jsx
  const InputState = require('./example/InputState').default;
  const IconMail = require('emblematic-icons/svg/Mail32.svg').default;
  <div>
    <InputState
      inputStyle="form"
      type="text"
      label="Email!"
      error="Error!"
    />
    <br />
    <InputState
      inputStyle="form"
      type="text"
      label="Email!"
      hint="Hint!"
      error="Error!"
    />
    <br />
    <InputState
      inputStyle="form"
      type="text"
      label="Email!"
      hint="Hint!"
      error="Error!"
      icon={<IconMail width={16} height={16} />}
    />
    <br />
    <InputState
      inputStyle="form"
      type="password"
      label="Password"
      hint="Hint!"
      error="Error!"
    />
    <br />
    <InputState
      inputStyle="form"
      type="text"
      label="Email!"
      hint="Hint!"
      error="Error!"
      multiline
    />
  </div>
```
