import React from 'react'
import { storiesOf } from '@storybook/react'

import Legend from '../../src/Legend'
import Section from '../Section'

const hidingLabel = [
  {
    color: '#4ca9d7',
    text: 'Zazu',
    acronym: 'ZZ',
    hideLabel: true,
  },
  {
    color: '#f16518',
    text: 'Zeke',
    acronym: 'ZK',
    hideLabel: true,
  },
  {
    color: '#41535b',
    text: 'Macaroni',
    hideLabel: true,
  },
]

const automaticAbbr = [
  {
    color: '#53be76',
    text: 'MacGuybird',
  },
  {
    color: '#fcb20a',
    text: 'Mad Dog',
  },
  {
    color: '#5b2886',
    text: 'Dabblit',
  },
  {
    color: '#9d9fa0',
    text: 'Danger Mouse',
  },
  {
    color: '#e00403',
    text: 'Dandelion',
  },
  {
    color: '#8c68d4',
    text: 'Caboodles',
  },
]

const manualAbbr = [
  {
    color: '#951d3c',
    text: 'Fa-neenee',
    acronym: 'FN',
  },
  {
    color: '#244d85',
    text: 'Fast Freddie',
    acronym: 'FF',
  },
  {
    color: '#bf5316',
    text: 'Tangsodo',
    acronym: 'TS',
  },
]

const createLegends = (title, status) => (
  <Section title={title}>
    {status.map(({
      color,
      text,
      acronym,
      hideLabel,
    }) => (
      <div key={text} style={{ marginBottom: '10px' }}>
        <Legend
          color={color}
          acronym={acronym}
          hideLabel={hideLabel}
        >
          {text}
        </Legend>
      </div>
    ))}
  </Section>
)

storiesOf('Legend', module)
  .add('Default', () => (
    <div>
      {createLegends('Without acronym prop', automaticAbbr)}
      {createLegends('With acronym prop', manualAbbr)}
      {createLegends('With hideLabel prop', hidingLabel)}
    </div>
  ))
