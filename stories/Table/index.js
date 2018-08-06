import React from 'react'
import { storiesOf } from '@storybook/react'

import TableState from './TableState'
import Section from '../Section'

storiesOf('Table', module)
  .add('Simple', () => (
    <Section>
      <TableState
        clickableRow
        simple
        showAggregationRow
      />
    </Section>
  ))
  .add('Selectable and expandable', () => (
    <Section>
      <TableState
        selectable
        expandable
      />
    </Section>
  ))
  .add('Action column', () => (
    <Section>
      <TableState primaryAction />
    </Section>
  ))
  .add('Disabled orderable', () => (
    <Section>
      <TableState
        selectable
        expandable
        disabled
      />
    </Section>
  ))
  .add('Empty renderer column', () => (
    <Section>
      <TableState hasEmptyRenderer />
    </Section>
  ))
  .add('Empty table', () => (
    <Section>
      <TableState
        empty
        disabled
      />
    </Section>
  ))
  .add('Expanded row renderer', () => (
    <Section>
      <TableState
        expandable
        hasExpandedRowRenderer
      />
    </Section>
  ))
  .add('Renderer row', () => (
    <Section>
      <TableState hasRowRenderer />
    </Section>
  ))
