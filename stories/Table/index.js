import React from 'react'
import { storiesOf } from '@storybook/react'

import TableState from './TableState'
import Section from '../Section'

storiesOf('Table', module)
  .add('Simple', () => (
    <Section title="Simple">
      <TableState clickableRow />
    </Section>
  ))
  .add('Selectable and expandable', () => (
    <Section title="Selectable and expandable">
      <TableState
        selectable
        expandable
      />
    </Section>
  ))
  .add('Action column', () => (
    <Section title="Action column">
      <TableState primaryAction />
    </Section>
  ))
