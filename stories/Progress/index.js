import React from 'react'
import { storiesOf } from '@storybook/react'

import LinearProgress from '../../src/LinearProgress'

import style from './style.css'

const percentages = [0, 25, 50, 75, 100]

storiesOf('Progress', module)
  .add('Linear', () => (
    <div className={style.container}>
      <section>
        <h2>Normal state</h2>
        {percentages.map(percent => (
          <div key={`mock${percent}`}>
            <LinearProgress
              label="Lorem Label"
              percent={percent}
            />
          </div>
        ))}
      </section>
      <section>
        <h2>Disabled state</h2>
        {percentages.map(percent => (
          <div key={`mock${percent}`}>
            <LinearProgress
              disabled
              label="Lorem Label"
              percent={percent}
            />
          </div>
        ))}
      </section>
    </div>
  ))

