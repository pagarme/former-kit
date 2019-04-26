import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import IconMail from 'emblematic-icons/svg/Mail32.svg'

import Section from '../Section'
import Input from '../../src/Input/form'

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
        hint="Secondary Text"
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
  type: null,
  value: 'pagarme@pagar.me',
}

storiesOf('Inputs', module)
  .add('Form', () => (
    <div>
      <Section title="Default">
        <InputState type="text" />
      </Section>

      <Section title="Error">
        <InputState type="text" error="Invalid email" />
      </Section>

      <Section title="Disabled">
        <Input
          name="email"
          label="Your email"
          disabled
          hint="Secondary Text"
          placeholder="disabled"
          onChange={action('text changed')}
          value=""
        />
      </Section>

      <Section title="Disabled with text">
        <Input
          name="email"
          label="Your email"
          disabled
          hint="Secondary Text"
          placeholder="disabled"
          onChange={action('text changed')}
          value="Disabled!"
        />
      </Section>

      <Section title="Masked input">
        <InputState
          label="Phone number"
          mask="111-111-111"
          placeholder="Type your phone number"
          type="text"
          value="431-051-080"
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
          placeholder="disabled"
          disabled
          onChange={action('text changed')}
          value="Multiline disabled!"
        />
      </Section>

      <Section title="Icon default">
        <InputState
          type="text"
          icon={
            <IconMail width={16} height={16} />
          }
        />
      </Section>

      <Section title="Icon error">
        <InputState
          type="text"
          error="Error!"
          icon={
            <IconMail width={16} height={16} />
          }
        />
      </Section>

      <Section title="Icon disabled">
        <Input
          name="name"
          label="Your email"
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
        <InputState
          multiline
          error="Error!"
          icon={
            <IconMail width={16} height={16} />
          }
        />
      </Section>

      <Section title="Icon multiline disabled">
        <Input
          name="multiline"
          label="Disabled"
          placeholder="disabled"
          multiline
          disabled
          icon={<IconMail width={16} height={16} />}
          onChange={action('text changed')}
          value=""
        />
      </Section>

      <Section title="Password default">
        <InputState
          type="password"
          label="Your password"
        />
      </Section>

      <Section title="Password error">
        <InputState
          type="password"
          label="Your password"
          error="Error"
        />
      </Section>

      <Section title="Password disabled">
        <Input
          type="password"
          name="pass"
          label="Your password"
          disabled
          placeholder="disabled"
          hint="Must have more than 12 pixel"
          onChange={action('text changed')}
          value=""
        />
      </Section>

      <Section title="Password disabled with text">
        <Input
          type="password"
          name="pass"
          label="Your password"
          disabled
          placeholder="disabled"
          hint="Must have more than 12 pixel"
          onChange={action('text changed')}
          value="secret_pass"
        />
      </Section>

      <Section title="Base Dark" base="dark">
        <InputState type="text" base="dark" />
      </Section>

      <Section title="Error" base="dark">
        <InputState type="text" error="Invalid email" base="dark" />
      </Section>

      <Section title="Disabled" base="dark">
        <Input
          base="dark"
          name="email"
          label="Your email"
          disabled
          hint="Secondary Text"
          placeholder="disabled"
          onChange={action('text changed')}
          value=""
        />
      </Section>

      <Section title="Disabled with text" base="dark">
        <Input
          base="dark"
          name="email"
          label="Your email"
          disabled
          hint="Secondary Text"
          placeholder="disabled"
          onChange={action('text changed')}
          value="Disabled!"
        />
      </Section>

      <Section title="Masked input" base="dark">
        <InputState
          base="dark"
          label="Phone number"
          mask="111-111-111"
          placeholder="Type your phone number"
          type="text"
          value="431-051-080"
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
          name="multiline"
          label="Disabled"
          multiline
          placeholder="disabled"
          disabled
          onChange={action('text changed')}
          value="Multiline disabled!"
        />
      </Section>

      <Section title="Icon default" base="dark">
        <InputState
          type="text"
          icon={
            <IconMail width={16} height={16} />
          }
          base="dark"
        />
      </Section>

      <Section title="Icon error" base="dark">
        <InputState
          type="text"
          error="Error!"
          icon={
            <IconMail width={16} height={16} />
          }
          base="dark"
        />
      </Section>

      <Section title="Icon disabled" base="dark">
        <Input
          base="dark"
          name="name"
          label="Your email"
          placeholder="disabled"
          disabled
          icon={<IconMail width={16} height={16} />}
          onChange={action('text changed')}
          value=""
        />
      </Section>

      <Section title="Icon multiline default" base="dark">
        <InputState
          multiline
          icon={
            <IconMail width={16} height={16} />
          }
          base="dark"
        />
      </Section>

      <Section title="Icon multiline error" base="dark">
        <InputState
          multiline
          error="Error!"
          icon={
            <IconMail width={16} height={16} />
          }
          base="dark"
        />
      </Section>

      <Section title="Icon multiline disabled" base="dark">
        <Input
          base="dark"
          name="multiline"
          label="Disabled"
          placeholder="disabled"
          multiline
          disabled
          icon={<IconMail width={16} height={16} />}
          onChange={action('text changed')}
          value=""
        />
      </Section>

      <Section title="Password default" base="dark">
        <InputState
          base="dark"
          type="password"
          label="Your password"
        />
      </Section>

      <Section title="Password error" base="dark">
        <InputState
          base="dark"
          type="password"
          label="Your password"
          error="Error"
        />
      </Section>

      <Section title="Password disabled" base="dark">
        <Input
          base="dark"
          type="password"
          name="pass"
          label="Your password"
          disabled
          placeholder="disabled"
          hint="Must have more than 12 pixel"
          onChange={action('text changed')}
          value=""
        />
      </Section>

      <Section title="Password disabled with text" base="dark">
        <Input
          base="dark"
          type="password"
          name="pass"
          label="Your password"
          disabled
          placeholder="disabled"
          hint="Must have more than 12 pixel"
          onChange={action('text changed')}
          value="secret_pass"
        />
      </Section>
    </div>
  ))

