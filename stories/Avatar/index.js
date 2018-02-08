import React from 'react'
import { storiesOf } from '@storybook/react'

import Section from '../Section'
import Avatar from '../../src/Avatar'

storiesOf('Avatar', module)
  .add('Default', () => (
    <div>
      <Section title="Default icon and size">
        <Avatar />
      </Section>

      <Section title="With custom image and default size">
        <Avatar photo="https://i.imgur.com/V9mgrCp.jpg" />
      </Section>

      <Section title="With custom image and size">
        <Avatar
          photo="https://i.imgur.com/V9mgrCp.jpg"
          size={50}
        />
      </Section>
    </div>
  ))

