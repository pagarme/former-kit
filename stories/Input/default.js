import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import IconMail from 'emblematic-icons/svg/Mail32.svg'

import Section from '../Section'
import Input from '../../src/Input'

class InputState extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: props.value }
  }

  render () {
    const {
      base,
      error,
      icon,
      label,
      mask,
      multiline,
      placeholder,
      type,
    } = this.props

    const {
      value,
    } = this.state

    return (
      <Input
        base={base}
        error={error}
        hint="Secondary text"
        icon={icon}
        label={label}
        mask={mask}
        multiline={multiline}
        name="email"
        onBlur={action('blur')}
        onChange={e => this.setState({ value: e.target.value })}
        onFocus={action('focus')}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    )
  }
}

InputState.defaultProps = {
  base: 'light',
  error: '',
  icon: null,
  label: 'Your email',
  mask: '',
  multiline: false,
  placeholder: 'name@email.com',
  success: '',
  type: null,
  value: 'pagarme@pagar.me',
}

storiesOf('Inputs', module)
  .add('Default', () => (
    <div>
      <Section title="Default">
        <InputState type="text" />
      </Section>

      <Section title="Error">
        <InputState type="text" error="Wrong email" />
      </Section>

      <Section title="Disabled">
        <Input
          name="email"
          label="Your email"
          disabled
          hint="Secondary text"
          placeholder="email@email.com"
          onChange={action('text changed')}
          value=""
        />
      </Section>

      <Section title="Disabled with text">
        <Input
          name="email"
          label="Your email"
          disabled
          hint="Secondary text"
          placeholder="email@email.com"
          onChange={action('text changed')}
          value="Disabled!"
        />
      </Section>

      <Section title="Masked input">
        <InputState
          mask="111-111-111"
          placeholder="Type your phone number"
          type="text"
          value=""
        />
      </Section>

      <Section title="Multiline default">
        <InputState multiline placeholder="default" />
      </Section>

      <Section title="Multiline error">
        <InputState multiline error="Error!" />
      </Section>

      <Section title="Multiline disabled">
        <Input
          name="multiline"
          label="Disabled"
          multiline
          placeholder="this is disabled"
          disabled
          onChange={action('text changed')}
          value=""
        />
      </Section>

      <Section title="Icon default">
        <InputState type="text" icon={<IconMail width={16} height={16} />} />
      </Section>

      <Section title="Icon error">
        <InputState type="text" error="Error!" icon={<IconMail width={16} height={16} />} />
      </Section>

      <Section title="Icon disabled">
        <Input
          name="name"
          label="Your name"
          placeholder="disabled"
          disabled
          icon={<IconMail width={16} height={16} />}
          onChange={action('text changed')}
          value=""
        />
      </Section>

      <Section title="Icon multiline default">
        <InputState multiline icon={<IconMail width={16} height={16} />} />
      </Section>

      <Section title="Icon multiline error">
        <InputState multiline error="Error!" icon={<IconMail width={16} height={16} />} />
      </Section>

      <Section title="Icon multiline disabled">
        <Input
          name="multiline"
          label="Disabled"
          placeholder="this is disabled"
          multiline
          disabled
          icon={<IconMail width={16} height={16} />}
          onChange={action('text changed')}
          value=""
        />
      </Section>

      <Section title="Password default">
        <InputState type="password" />
      </Section>

      <Section title="Password error">
        <InputState type="password" error="must have more than 12 characters" />
      </Section>

      <Section title="Password disabled">
        <Input
          type="password"
          name="pass"
          label="Your password"
          disabled
          placeholder="disabled"
          hint="must have more than 12 characters"
          onChange={action('text changed')}
          value=""
        />
      </Section>
    </div>
  ))
