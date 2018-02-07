import React from 'react'
import { storiesOf } from '@storybook/react'

import Section from '../Section'
import FooterExample from './FooterExample'

storiesOf('Footer', module)
  .add('Default', () => (
    <Section title="Only example">
      <FooterExample />
    </Section>
  ))
