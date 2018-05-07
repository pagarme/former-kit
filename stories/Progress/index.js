import React from 'react'
import { storiesOf } from '@storybook/react'

import LinearProgress from '../../src/LinearProgress'
import Section from '../Section'

import style from './style.css'

const numbers = [0, 1, 2, 3, 4, 5]

storiesOf('Progress', module)
  .add('Linear', () => (
    <div className={style.progressBars}>
      <Section title="Normal state">
        {numbers.map(number => (
          <LinearProgress
            key={`mock${number}`}
            max={numbers[numbers.length - 1]}
            value={number}
          />
        ))}
      </Section>
      <Section title="Normal state without percentage">
        {numbers.map(number => (
          <LinearProgress
            key={`mock${number}`}
            max={numbers[numbers.length - 1]}
            percent={false}
            value={number}
          />
        ))}
      </Section>
      <Section title="Normal state without label">
        {numbers.map(number => (
          <LinearProgress
            key={`mock${number}`}
            label={false}
            max={numbers[numbers.length - 1]}
            value={number}
          />
        ))}
      </Section>

      <Section title="Disabled state">
        {numbers.map(number => (
          <LinearProgress
            disabled
            key={`mock${number}`}
            max={numbers[numbers.length - 1]}
            value={number}
          />
        ))}
      </Section>
      <Section title="Disabled state without percentage">
        {numbers.map(number => (
          <LinearProgress
            disabled
            key={`mock${number}`}
            max={numbers[numbers.length - 1]}
            percent={false}
            value={number}
          />
        ))}
      </Section>
      <Section title="Disabled state without label">
        {numbers.map(number => (
          <LinearProgress
            disabled
            key={`mock${number}`}
            label={false}
            max={numbers[numbers.length - 1]}
            value={number}
          />
        ))}
      </Section>
    </div>
  ))

