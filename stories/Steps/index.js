import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  Card,
  CardSection,
} from '../../src/Card'
import Steps from '../../src/Steps'
import Section from '../Section'

storiesOf('Steps', module)
  .add('Default', () => (
    <Section>
      <h2>First step</h2>
      <Steps
        status={[
          { id: 'success', status: 'current' },
          { id: 'current', status: 'pending' },
          { id: 'pending', status: 'pending' },
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
          { id: 'pending', status: 'pending' },
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

      <h2>Error</h2>
      <Steps
        status={[
          { id: 'success', status: 'success' },
          { id: 'current', status: 'success' },
          { id: 'error', status: 'error' },
        ]}
        steps={[
          { id: 'success', title: 'Success' },
          { id: 'current', title: 'Current' },
          { id: 'error', title: 'Error' },
        ]}
      />

      <h2>Inside a card</h2>
      <Card>
        <Steps
          status={[
            { id: 'success', status: 'success' },
            { id: 'current', status: 'success' },
            { id: 'error', status: 'error' },
          ]}
          steps={[
            { id: 'success', title: 'Success' },
            { id: 'current', title: 'Current' },
            { id: 'error', title: 'Error' },
          ]}
        />
      </Card>

      <h2>Inside a card section</h2>
      <CardSection>
        <Steps
          status={[
            { id: 'success', status: 'success' },
            { id: 'current', status: 'success' },
            { id: 'error', status: 'error' },
          ]}
          steps={[
            { id: 'success', title: 'Success' },
            { id: 'current', title: 'Current' },
            { id: 'error', title: 'Error' },
          ]}
        />
      </CardSection>
    </Section>
  ))
