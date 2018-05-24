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
          { id: 'id1', status: 'current' },
          { id: 'id2', status: 'pending' },
          { id: 'id3', status: 'pending' },
        ]}
        steps={[
          { id: 'id1', title: 'Step 1' },
          { id: 'id2', title: 'Step 2' },
          { id: 'id3', title: 'Step 3' },
        ]}
      />

      <h2>Second step</h2>
      <Steps
        status={[
          { id: 'id1', status: 'success' },
          { id: 'id2', status: 'current' },
          { id: 'id3', status: 'pending' },
        ]}
        steps={[
          { id: 'id1', title: 'Step 1' },
          { id: 'id2', title: 'Step 2' },
          { id: 'id3', title: 'Step 3' },
        ]}
      />

      <h2>Last step</h2>
      <Steps
        status={[
          { id: 'id1', status: 'success' },
          { id: 'id2', status: 'success' },
          { id: 'id3', status: 'current' },
        ]}
        steps={[
          { id: 'id1', title: 'Step 1' },
          { id: 'id2', title: 'Step 2' },
          { id: 'id3', title: 'Step 3' },
        ]}
      />

      <h2>Error</h2>
      <Steps
        status={[
          { id: 'id1', status: 'success' },
          { id: 'id2', status: 'success' },
          { id: 'id3', status: 'error' },
        ]}
        steps={[
          { id: 'id1', title: 'Step 1' },
          { id: 'id2', title: 'Step 2' },
          { id: 'id3', title: 'Step 3' },
        ]}
      />

      <h2>Inside a card</h2>
      <Card>
        <Steps
          status={[
            { id: 'id1', status: 'success' },
            { id: 'id2', status: 'success' },
            { id: 'id3', status: 'error' },
          ]}
          steps={[
            { id: 'id1', title: 'Step 1' },
            { id: 'id2', title: 'Step 2' },
            { id: 'id3', title: 'Step 3' },
          ]}
        />
      </Card>

      <h2>Inside a card section</h2>
      <CardSection>
        <Steps
          status={[
            { id: 'id1', status: 'success' },
            { id: 'id2', status: 'success' },
            { id: 'id3', status: 'error' },
          ]}
          steps={[
            { id: 'id1', title: 'Step 1' },
            { id: 'id2', title: 'Step 2' },
            { id: 'id3', title: 'Step 3' },
          ]}
        />
      </CardSection>
    </Section>
  ))
