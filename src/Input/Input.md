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
      success,
      type,
      inputStyle,
      label,
      hint,
      disabled,
    } = this.props

    const {
      email,
    } = this.state

    return inputStyle === 'default'
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
          success={success}
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
          success={success}
          type={type}
          value={email}
          disabled={disabled}
        />
      )
  }
}
```

The default Input looks like this:
```jsx
const InputState = require('./example/InputState').default;
const IconMail = require('emblematic-icons/svg/Mail32.svg').default;

<div>
  <InputState
    inputStyle="default"
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
</div>
```

The form Input looks like this:
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
</div>
```

Both inputs can show success and error messages:
```jsx
const InputState = require('./example/InputState').default;
const IconMail = require('emblematic-icons/svg/Mail32.svg').default;

<div>
  <InputState
    inputStyle="default"
    type="text"
    label="Email!"
    hint="Hint!"
    success="Success!"
  />

  <br />

  <InputState
    inputStyle="form"
    type="text"
    label="Email!"
    hint="Hint!"
    success="Success!"
  />

  <br />

  <InputState
    inputStyle="default"
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
  />
</div>
```

Also, both inputs can be multiline:
```jsx
const InputState = require('./example/InputState').default;
const IconMail = require('emblematic-icons/svg/Mail32.svg').default;

<div>
  <InputState
    inputStyle="default"
    type="text"
    label="Email!"
    hint="Hint!"
    multiline
  />

  <br />

  <InputState
    inputStyle="form"
    type="text"
    label="Email!"
    hint="Hint!"
    multiline
  />

  <br />

  <InputState
    inputStyle="default"
    type="text"
    label="Email!"
    hint="Hint!"
    multiline
    icon={<IconMail width={16} height={16} />}
  />

  <br />

  <InputState
    inputStyle="form"
    type="text"
    label="Email!"
    hint="Hint!"
    multiline
    icon={<IconMail width={16} height={16} />}
  />

  <br />

  <InputState
    inputStyle="default"
    type="text"
    label="Email!"
    hint="Hint!"
    multiline
    success="Success!"
  />

  <br />

  <InputState
    inputStyle="form"
    type="text"
    label="Email!"
    hint="Hint!"
    multiline
    success="Success!"
  />

  <br />

  <InputState
    inputStyle="default"
    type="text"
    label="Email!"
    hint="Hint!"
    multiline
    error="Error!"
  />

  <br />

  <InputState
    inputStyle="form"
    type="text"
    label="Email!"
    hint="Hint!"
    multiline
    error="Error!"
  />
</div>
```

and have a disabled state:
```jsx
const InputState = require('./example/InputState').default;
const IconMail = require('emblematic-icons/svg/Mail32.svg').default;

<div>
  <InputState
    inputStyle="default"
    type="text"
    label="Email!"
    hint="Hint!"
    disabled
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
    inputStyle="default"
    type="text"
    label="Email!"
    hint="Hint!"
    disabled
    icon={<IconMail width={16} height={16} />}
  />

  <br />

  <InputState
    inputStyle="form"
    type="text"
    label="Email!"
    hint="Hint!"
    disabled
    icon={<IconMail width={16} height={16} />}
  />
</div>
```

Both inputs can also have a password type:
```jsx
const InputState = require('./example/InputState').default;
const IconMail = require('emblematic-icons/svg/Mail32.svg').default;

<div>
  <InputState
    inputStyle="default"
    type="password"
    label="Password!"
    hint="Hint!"
  />

  <br />

  <InputState
    inputStyle="form"
    type="password"
    label="Password!"
    hint="Hint!"
  />

  <br />

  <InputState
    inputStyle="default"
    type="password"
    label="Password!"
    hint="Hint!"
    disabled
  />

  <br />

  <InputState
    inputStyle="form"
    type="password"
    label="Password!"
    hint="Hint!"
    disabled
  />

  <br />

  <InputState
    inputStyle="default"
    type="password"
    label="Password!"
    hint="Hint!"
    success="Success!"
  />

  <br />

  <InputState
    inputStyle="form"
    type="password"
    label="Password!"
    hint="Hint!"
    success="Success!"
  />

  <br />

  <InputState
    inputStyle="default"
    type="password"
    label="Password!"
    hint="Hint!"
    error="Error!"
  />

  <br />

  <InputState
    inputStyle="form"
    type="password"
    label="Password!"
    hint="Hint!"
    error="Error!"
  />
</div>
```
