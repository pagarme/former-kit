import React from 'react'
import { action } from '@storybook/addon-actions'
import IconLink from 'emblematic-icons/svg/Link20.svg'
import IconGithub from 'emblematic-icons/svg/Github20.svg'
import IconFacebook from 'emblematic-icons/svg/Facebook20.svg'

import Footer from '../../src/Footer'

const links = [
  {
    onClick: () => action('Documentation'),
    title: 'Documentation',
  },
  {
    onClick: () => action('Support'),
    title: 'Support',
  },
  {
    onClick: () => action('Privacy'),
    title: 'Privacy',
  },
  {
    onClick: () => action('Contact'),
    title: 'Contact',
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
