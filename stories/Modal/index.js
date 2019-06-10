import React from 'react'
import { storiesOf } from '@storybook/react'

import Section from '../Section'

import ModalWithState from './ModalWithState'
import ModalWithHugeSize from './ModalWithHugeSize'

storiesOf('Modal', module)
  .add('Default', () => (
    <div>
      <Section>
        <ModalWithState />
      </Section>
      <Section>
        <ModalWithHugeSize />
      </Section>
    </div>
  ))

