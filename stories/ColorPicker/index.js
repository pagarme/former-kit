import React from 'react'
import { storiesOf } from '@storybook/react'

import Section from '../Section'
import ColorExample from './ColorExample'

storiesOf('ColorPicker', module)
  .add('Default', () => (
    <div>
      <Section title="Default color picker">
        <ColorExample />
      </Section>
    </div>
  ))

