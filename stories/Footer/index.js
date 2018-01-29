import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import GoRepoClone from 'react-icons/lib/go/repo-clone'
import GoSquirrel from 'react-icons/lib/go/squirrel'
import GoHubot from 'react-icons/lib/go/hubot'

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

storiesOf('Footer', module)
  .add('defaultTheme', () => (
    <Footer
      links={links}
    >
      <button onClick={() => action('clicked')}><GoRepoClone /></button>
      <button onClick={() => action('clicked')}><GoSquirrel /></button>
      <button onClick={() => action('clicked')}><GoHubot /></button>
    </Footer>
  ))
