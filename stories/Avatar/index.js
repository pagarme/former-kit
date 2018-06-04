import React from 'react'
import { storiesOf } from '@storybook/react'

import Section from '../Section'
import Avatar from '../../src/Avatar'

storiesOf('Avatar', module)
  .add('Default', () => (
    <div>
      <Section title="Default icon and size">
        <Avatar alt="icon only" />
      </Section>

      <Section title="With custom image and default size">
        <Avatar alt="N.Cage" photo="https://i.imgur.com/V9mgrCp.jpg" />
      </Section>

      <Section title="With custom image and size">
        <Avatar
          alt="N.Cage"
          photo="https://i.imgur.com/V9mgrCp.jpg"
          size={50}
        />
      </Section>
    </div>
  ))

