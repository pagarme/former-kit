import React from 'react'
import { storiesOf } from '@storybook/react'

import Section from '../Section'

import ModalWithState from './ModalWithState'
import ModalWithHugeSize from './ModalWithHugeSize'
import ModalWithMobileSize from './ModalWithMobileSize'
import ModalWithSmallSize from './ModalWithSmallSize'

storiesOf('Modal', module)
  .add('Default', () => (
    <div>
      <Section>
        <ModalWithState />
      </Section>
      <Section>
        <ModalWithHugeSize />
      </Section>
      <Section>
        <ModalWithMobileSize />
      </Section>
      <Section>
        <ModalWithSmallSize />
      </Section>
    </div>
  ))

