import React from 'react'
import { storiesOf } from '@storybook/react'

import Legend from '../../src/Legend'
import Section from '../Section'

const hidingLabel = [
  {
    acronym: 'ZZ',
    color: '#4ca9d7',
    hideLabel: true,
    text: 'Zazu',
  },
  {
    acronym: 'ZK',
    color: '#f16518',
    hideLabel: true,
    text: 'Zeke',
  },
  {
    color: '#41535b',
    hideLabel: true,
    text: 'Macaroni',
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
    acronym: 'FN',
    color: '#951d3c',
    text: 'Fa-neenee',
  },
  {
    acronym: 'FF',
    color: '#244d85',
    text: 'Fast Freddie',
  },
  {
    acronym: 'TS',
    color: '#bf5316',
    text: 'Tangsodo',
  },
]

const acronymCapitalize = [
  {
    acronym: 'Lois Cooper',
    color: '#453aa6',
    text: 'Lois Cooper',
    textFormat: 'capitalize',
  },
  {
    acronym: 'Ibrahim Ferguson',
    color: '#a63a82',
    text: 'Ibrahim Ferguson',
    textFormat: 'capitalize',
  },
  {
    acronym: 'Cells',
    color: '#9bc355',
    text: 'Cells',
    textFormat: 'capitalize',
  },
]

const acronymUppercase = [
  {
    acronym: 'Amber Bajee',
    color: '#c37355',
    text: 'Amber Bajee',
  },
  {
    acronym: 'AreBeeJee',
    color: '#226cf7',
    text: 'AreBeeJee',
  },
  {
    acronym: 'Strong Muffin',
    color: '#b60707',
    text: ('Strong Muffin'),
  },
]

const withoutChildren = [
  {
    acronym: 'No children',
    color: '#453aa6',
  },
  {
    acronym: 'No children',
    color: '#a63a82',
  },
  {
    acronym: 'No children',
    color: '#9bc355',
  },
]

const createLegends = (title, status) => (
  <Section title={title}>
    {status.map(({
      acronym,
      color,
      hideLabel,
      text,
      textFormat,
    }) => (
      <div key={text} style={{ marginBottom: '10px' }}>
        <Legend
          color={color}
          acronym={acronym}
          hideLabel={hideLabel}
          textFormat={textFormat}
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
      {createLegends('With capitalize letters', acronymCapitalize)}
      {createLegends('With uppercase letters', acronymUppercase)}
      {createLegends('With no children', withoutChildren)}
    </div>
  ))
