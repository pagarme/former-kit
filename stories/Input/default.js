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
      size,
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
        size={size}
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

      <Section title="Tiny size">
        <InputState type="text" size="tiny" />
      </Section>

      <Section title="Huge size">
        <InputState type="text" size="huge" />
      </Section>

      <Section title="Huge size for password">
        <InputState type="password" size="huge" />
      </Section>

      <Section title="Error">
        <InputState type="text" error="Wrong email" />
      </Section>

      <Section title="Disabled">
        <Input
          disabled
          hint="Secondary text"
          label="Your email"
          name="email"
          onChange={action('text changed')}
          placeholder="email@email.com"
          value=""
        />
      </Section>

      <Section title="Disabled with text">
        <Input
          disabled
          hint="Secondary text"
          label="Your email"
          name="email"
          onChange={action('text changed')}
          placeholder="email@email.com"
          value="Disabled!"
        />
      </Section>

      <Section title="Masked input">
        <InputState
          mask="111-111-111"
          placeholder="Type your phone number"
          type="tel"
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
          disabled
          label="Disabled"
          multiline
          name="multiline"
          onChange={action('text changed')}
          placeholder="this is disabled"
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
          disabled
          icon={<IconMail width={16} height={16} />}
          label="Your name"
          name="name"
          onChange={action('text changed')}
          placeholder="disabled"
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
          disabled
          icon={<IconMail width={16} height={16} />}
          label="Disabled"
          multiline
          name="multiline"
          onChange={action('text changed')}
          placeholder="this is disabled"
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
          disabled
          hint="must have more than 12 characters"
          label="Your password"
          name="pass"
          onChange={action('text changed')}
          placeholder="disabled"
          type="password"
          value=""
        />
      </Section>

      <Section title="Default" base="dark">
        <InputState type="text" base="dark" />
      </Section>

      <Section title="Tiny Size" base="dark">
        <InputState type="text" size="tiny" base="dark" />
      </Section>

      <Section title="Error" base="dark">
        <InputState
          base="dark"
          error="Wrong email"
          type="text"
        />
      </Section>

      <Section title="Disabled" base="dark">
        <Input
          base="dark"
          disabled
          hint="Secondary text"
          label="Your email"
          name="email"
          onChange={action('text changed')}
          placeholder="email@email.com"
          value=""
        />
      </Section>

      <Section title="Disabled with text" base="dark">
        <Input
          base="dark"
          disabled
          hint="Secondary text"
          label="Your email"
          name="email"
          onChange={action('text changed')}
          placeholder="email@email.com"
          value="Disabled!"
        />
      </Section>

      <Section title="Masked input" base="dark">
        <InputState
          base="dark"
          mask="111-111-111"
          placeholder="Type your phone number"
          type="phone"
          value=""
        />
      </Section>

      <Section title="Multiline default" base="dark">
        <InputState multiline placeholder="default" base="dark" />
      </Section>

      <Section title="Multiline error" base="dark">
        <InputState multiline error="Error!" base="dark" />
      </Section>

      <Section title="Multiline disabled" base="dark">
        <Input
          base="dark"
          disabled
          label="Disabled"
          multiline
          name="multiline"
          onChange={action('text changed')}
          placeholder="this is disabled"
          value=""
        />
      </Section>

      <Section title="Icon default" base="dark">
        <InputState
          base="dark"
          icon={<IconMail width={16} height={16} />}
          type="text"
        />
      </Section>

      <Section title="Icon error" base="dark">
        <InputState
          base="dark"
          error="Error!"
          icon={<IconMail width={16} height={16} />}
          type="text"
        />
      </Section>

      <Section title="Icon disabled" base="dark">
        <Input
          base="dark"
          disabled
          icon={<IconMail width={16} height={16} />}
          label="Your name"
          name="name"
          onChange={action('text changed')}
          placeholder="disabled"
          value=""
        />
      </Section>

      <Section title="Icon multiline default" base="dark">
        <InputState
          base="dark"
          icon={<IconMail width={16} height={16} />}
          multiline
        />
      </Section>

      <Section title="Icon multiline error" base="dark">
        <InputState
          base="dark"
          error="Error!"
          icon={<IconMail width={16} height={16} />}
          multiline
        />
      </Section>

      <Section title="Icon multiline disabled" base="dark">
        <Input
          base="dark"
          disabled
          icon={<IconMail width={16} height={16} />}
          label="Disabled"
          multiline
          name="multiline"
          onChange={action('text changed')}
          placeholder="this is disabled"
          value=""
        />
      </Section>

      <Section title="Password default" base="dark">
        <InputState type="password" base="dark" />
      </Section>

      <Section title="Password error" base="dark">
        <InputState
          base="dark"
          error="must have more than 12 characters"
          type="password"
        />
      </Section>

      <Section title="Password disabled" base="dark">
        <Input
          base="dark"
          disabled
          hint="must have more than 12 characters"
          label="Your password"
          name="pass"
          onChange={action('text changed')}
          placeholder="disabled"
          type="password"
          value=""
        />
      </Section>
    </div>
  ))
