import React from 'react'
import { storiesOf } from '@storybook/react'

import Steps from '../../src/Steps'
import Section from '../Section'

storiesOf('Steps', module)
  .add('Default', () => (
    <Section>
      <h2>First step</h2>
      <Steps
        status={[
          { id: 'success', status: 'current' },
        ]}
        steps={[
          { id: 'success', title: 'Success' },
          { id: 'current', title: 'Current' },
          { id: 'pending', title: 'Pending' },
        ]}
      />

      <h2>Second step</h2>
      <Steps
        status={[
          { id: 'success', status: 'success' },
          { id: 'current', status: 'current' },
        ]}
        steps={[
          { id: 'success', title: 'Success' },
          { id: 'current', title: 'Current' },
          { id: 'pending', title: 'Pending' },
        ]}
      />

      <h2>Last step</h2>
      <Steps
        status={[
          { id: 'success', status: 'success' },
          { id: 'current', status: 'success' },
          { id: 'pending', status: 'current' },
        ]}
        steps={[
          { id: 'success', title: 'Success' },
          { id: 'current', title: 'Current' },
          { id: 'pending', title: 'Pending' },
        ]}
      />
    </Section>
  ))
