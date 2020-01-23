import React from 'react'
import { storiesOf } from '@storybook/react'

import SecondaryLinearProgress from '../../src/LinearProgress/SecondaryLinearProgress'
import Section from '../Section'

import style from './style.css'

storiesOf('Progress', module)
  .add('SecondaryLinearProgress', () => (
    <div className={style.progressBar} style={{ maxWidth: 500 }}>
      <Section>
        <SecondaryLinearProgress value={0} max={100} />
        <SecondaryLinearProgress value={20} max={100} />
        <SecondaryLinearProgress value={40} max={100} />
        <SecondaryLinearProgress value={65} max={100} />
        <SecondaryLinearProgress value={80} max={100} />
        <SecondaryLinearProgress value={100} max={100} />
      </Section>
    </div>
  ))
