import React from 'react'
import { action } from '@storybook/addon-actions'
import IconLink from 'emblematic-icons/svg/Link20.svg'
import IconGithub from 'emblematic-icons/svg/Github20.svg'
import IconFacebook from 'emblematic-icons/svg/Facebook20.svg'

import Footer from '../../Footer'

const links = [
  {
    onClick: () => action('Documentação'),
    title: 'Documentação',
  },
  {
    onClick: () => action('Suporte'),
    title: 'Suporte',
  },
  {
    onClick: () => action('Política de privacidade'),
    title: 'Política de Privacidade',
  },
  {
    onClick: () => action('Contato'),
    title: 'Contato',
  },
]

const FooterExample = () => (
  <Footer
    links={links}
  >
    <button onClick={() => action('clicked')} type="button">
      <IconLink />
    </button>
    <button onClick={() => action('clicked')} type="button">
      <IconGithub />
    </button>
    <button onClick={() => action('clicked')} type="button">
      <IconFacebook />
    </button>
  </Footer>
)

export default FooterExample
