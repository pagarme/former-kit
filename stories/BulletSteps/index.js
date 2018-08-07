import React from 'react'
import { storiesOf } from '@storybook/react'

import BulletSteps from '../../src/BulletSteps'
import Section from '../Section'

storiesOf('BulletSteps', module)
  .add('Default', () => (
    <Section>
      <h2>First step</h2>
      <BulletSteps
        status={[
          { id: 'id1', status: 'current' },
          { id: 'id2', status: 'next' },
          { id: 'id3', status: 'next' },
        ]}
        steps={[
          { id: 'id1' },
          { id: 'id2' },
          { id: 'id3' },
        ]}
      />

      <h2>Second step</h2>
      <BulletSteps
        status={[
          { id: 'id1', status: 'previous' },
          { id: 'id2', status: 'current' },
          { id: 'id3', status: 'next' },
        ]}
        steps={[
          { id: 'id1' },
          { id: 'id2' },
          { id: 'id3' },
        ]}
      />

      <h2>Last step</h2>
      <BulletSteps
        status={[
          { id: 'id1', status: 'previous' },
          { id: 'id2', status: 'previous' },
          { id: 'id3', status: 'current' },
        ]}
        steps={[
          { id: 'id1' },
          { id: 'id2' },
          { id: 'id3' },
        ]}
      />
    </Section>
  ))
