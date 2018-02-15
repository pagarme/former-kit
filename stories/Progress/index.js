import React from 'react'
import { storiesOf } from '@storybook/react'

import LinearProgress from '../../src/LinearProgress'
import Section from '../Section'

const percentages = [0, 25, 50, 75, 100]

storiesOf('Progress', module)
  .add('Linear', () => (
    <div>
      <Section title="Normal state">
        {percentages.map(percent => (
          <div key={`mock${percent}`}>
            <LinearProgress
              label="Lorem Label"
              percent={percent}
            />
          </div>
        ))}
      </Section>
      <Section title="Disabled state">
        {percentages.map(percent => (
          <div key={`mock${percent}`}>
            <LinearProgress
              disabled
              label="Lorem Label"
              percent={percent}
            />
          </div>
        ))}
      </Section>
    </div>
  ))

