import React from 'react'
import { action } from '@storybook/addon-actions'
import IconLink from 'emblematic-icons/svg/Link20.svg'
import IconGithub from 'emblematic-icons/svg/Github20.svg'
import IconFacebook from 'emblematic-icons/svg/Facebook20.svg'

import Footer from '../../src/Footer'

const links = [
  {
    title: 'Documentação',
    onClick: () => action('Documentação'),
  },
  {
    title: 'Suporte',
    onClick: () => action('Suporte'),
  },
  {
    title: 'Política de Privacidade',
    onClick: () => action('Política de privacidade'),
  },
  {
    title: 'Contato',
    onClick: () => action('Contato'),
  },
]

const FooterExample = () => (
  <Footer
    links={links}
  >
    <button onClick={() => action('clicked')}><IconLink /></button>
    <button onClick={() => action('clicked')}><IconGithub /></button>
    <button onClick={() => action('clicked')}><IconFacebook /></button>
  </Footer>
)

export default FooterExample
