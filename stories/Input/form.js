import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import IconMail from 'emblematic-icons/svg/Mail32.svg'

import Input from '../../src/Input/form'
import style from '../style.css'


class InputState extends React.Component {
  constructor (props) {
    super(props)
    this.state = { email: 'pagarme@pagar.me' }
  }

  render () {
    const {
      error,
      icon,
      multiline,
      success,
      type,
    } = this.props

    const {
      email,
    } = this.state

    return (
      <Input
        error={error}
        hint="Secondary Text"
        icon={icon}
        label={label}
        multiline={multiline}
        name="email"
        onChange={e => this.setState({ email: e.target.value })}
        placeholder="name@email.com"
        success={success}
        type={type}
        value={email}
      />
    )
  }
}

InputState.defaultProps = {
  error: '',
  icon: null,
  multiline: false,
  success: '',
  type: null,
}

storiesOf('Inputs', module)
  .add('Form', () => (
    <div className={style.container}>
      <h2>Form Inputs</h2>

      <section>
        <h3>Disabled</h3>
        <Input
          name="email"
          label="Digite seu email"
          disabled
          hint="Texto secundário"
          placeholder="eae"
          onChange={action('text changed')}
          value=""
        />
      </section>

      <section>
        <h3>Default</h3>
        <InputState type="text" />
      </section>

      <section>
        <h3>Error</h3>
        <InputState type="text" error="Email no formato errado" />
      </section>

      <section>
        <h3>Success</h3>
        <InputState type="text" success="Good jobi lirou frendi" />
      </section>

      <section>
        <h3>Multiline disabled</h3>
        <Input
          name="teste"
          label="Fale tudo"
          multiline
          placeholder="eae"
          disabled
          onChange={action('text changed')}
          value=""
        />
      </section>

      <section>
        <h3>Multiline default</h3>
        <InputState multiline placeholder="eae" />
      </section>

      <section>
        <h3>Multiline error</h3>
        <InputState multiline error="Erro!" />
      </section>

      <section>
        <h3>Multiline success</h3>
        <InputState multiline success="Sucesso!" />
      </section>

      <section>
        <h3>Icon disabled</h3>
        <Input
          name="name"
          label="Digite seu nome"
          placeholder="eaee"
          disabled
          icon={<IconMail width={16} height={16} />}
          onChange={action('text changed')}
          value=""
        />
      </section>

      <section>
        <h3>Icon default</h3>
        <InputState type="text" icon={<IconMail width={16} height={16} />} />
      </section>

      <section>
        <h3>Icon error</h3>
        <InputState type="text" error="Erro!" icon={<IconMail width={16} height={16} />} />
      </section>

      <section>
        <h3>Icon success</h3>
        <InputState type="text" success="Sucesso!" icon={<IconMail width={16} height={16} />} />
      </section>

      <section>
        <h3>Icon multiline disabled</h3>
        <Input
          name="teste"
          label="Fale tudo"
          placeholder="eae"
          multiline
          disabled
          icon={<IconMail width={16} height={16} />}
          onChange={action('text changed')}
          value=""
        />
      </section>

      <section>
        <h3>Icon multiline default</h3>
        <InputState multiline icon={<IconMail width={16} height={16} />} />
      </section>

      <section>
        <h3>Icon multiline error</h3>
        <InputState multiline error="Erro!" icon={<IconMail width={16} height={16} />} />
      </section>

      <section>
        <h3>Icon multiline success</h3>
        <InputState multiline success="Sucesso!" icon={<IconMail width={16} height={16} />} />
      </section>

      <section>
        <h3>Password disabled</h3>
        <Input
          type="password"
          name="pass"
          label="Digite sua senha"
          disabled
          placeholder="eae"
          hint="Minimo de 12 pixels"
          onChange={action('text changed')}
          value=""
        />
      </section>

      <section>
        <h3>Password default</h3>
        <InputState
          type="password"
        />
      </section>

      <section>
        <h3>Password error</h3>
        <InputState
          type="password"
          error="Digite mais caracteres"
        />
      </section>

      <section>
        <h3>Password success</h3>
        <InputState
          type="password"
          success="Boa rapá"
        />
      </section>
    </div>
  ))

