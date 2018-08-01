import React from 'react'
import { storiesOf } from '@storybook/react'

import Section from '../Section'
import UploadImage from '../../src/UploadImage'

storiesOf('UploadImage', module)
  .add('Default', () => (
    <Section title="Upload Image">
      <UploadImage />
    </Section>
  ))
