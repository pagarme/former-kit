import React from 'react'
import { action } from '@storybook/addon-actions'
import IconLink from 'emblematic-icons/svg/Link20.svg'
import IconGithub from 'emblematic-icons/svg/Github20.svg'
import IconFacebook from 'emblematic-icons/svg/Facebook20.svg'

import Footer from '../../src/Footer'

const links = [
  {
    title: 'Documentation',
    onClick: () => action('Documentation'),
  },
  {
    title: 'Support',
    onClick: () => action('Support'),
  },
  {
    title: 'Privacy',
    onClick: () => action('Privacy'),
  },
  {
    title: 'Contact',
    onClick: () => action('Contact'),
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
