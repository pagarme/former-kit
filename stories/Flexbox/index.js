import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'

import Section from '../Section'
import Button from '../../src/Button'
import Flexbox from '../../src/Flexbox'
import Spacing from '../../src/Spacing'

import style from './style.css'

const Renderer = () => (
  <Fragment>
    <Button>button</Button>
    <Spacing size="tiny" />
    <Button>button</Button>
    <Spacing size="tiny" />
    <Button>button</Button>
  </Fragment>
)

const Square = ({ children }) => (
  <div className={style.squares}>
    {children}
  </div>
)

storiesOf('Flexbox', module)
  .add('JustifyContent', () => (
    <Fragment>
      <Section title="justifyContent: flex-start">
        <Flexbox>
          <Renderer />
        </Flexbox>
      </Section>

      <Section title="justifyContent: center">
        <Flexbox justifyContent="center">
          <Renderer />
        </Flexbox>
      </Section>

      <Section title="justifyContent: flex-end">
        <Flexbox justifyContent="flex-end">
          <Renderer />
        </Flexbox>
      </Section>

      <Section title="justifyContent: space-evenly">
        <Flexbox justifyContent="space-evenly">
          <Renderer />
        </Flexbox>
      </Section>

      <Section title="justifyContent: space-around">
        <Flexbox justifyContent="space-around">
          <Renderer />
        </Flexbox>
      </Section>

      <Section title="justifyContent: space-between">
        <Flexbox justifyContent="space-between">
          <Renderer />
        </Flexbox>
      </Section>
    </Fragment>
  ))
  .add('Align Items', () => (
    <Fragment>
      <Section title="alignItems: flex-start">
        <Flexbox alignItems="flex-start" className={style.boxSize}>
          <Renderer />
        </Flexbox>
      </Section>

      <Section title="alignItems: center">
        <Flexbox alignItems="center" className={style.boxSize}>
          <Renderer />
        </Flexbox>
      </Section>

      <Section title="alignItems: flex-end">
        <Flexbox alignItems="flex-end" className={style.boxSize}>
          <Renderer />
        </Flexbox>
      </Section>

      <Section title="alignItems: stretch">
        <Flexbox alignItems="stretch" className={style.boxSize}>
          <Square>A long text<br /> A long long text</Square>
          <Spacing size="tiny" />
          <Square>A small text.</Square>
          <Spacing size="tiny" />
          <Square>A small text.</Square>
          <Spacing size="tiny" />
          <Square>A small text.</Square>
          <Spacing size="tiny" />
        </Flexbox>
      </Section>

      <Section title="alignItems: baseline">
        <Flexbox alignItems="baseline" className={style.boxSize}>
          <Square>A long text<br /> A long long text</Square>
          <Spacing size="tiny" />
          <Square>A small text.</Square>
          <Spacing size="tiny" />
          <Square>lets <br />break <br />lines.</Square>
          <Spacing size="tiny" />
          <Square>A small text.</Square>
          <Spacing size="tiny" />
        </Flexbox>
      </Section>
    </Fragment>
  ))
  .add('Directions', () => (
    <Fragment>
      <Section title="Direction: row">
        <Flexbox direction="row">
          <Button>A Button</Button>
          <Spacing size="tiny" />
          <Button>Another Button</Button>
        </Flexbox>
      </Section>

      <Section title="Direction: column">
        <Flexbox direction="column">
          <Button>A Button</Button>
          <Spacing size="tiny" />
          <Button>Another Button</Button>
        </Flexbox>
      </Section>

      <Section title="Direction: row-reverse">
        <Flexbox direction="row-reverse">
          <Button>first button</Button>
          <Spacing size="tiny" />
          <Button>second Button</Button>
        </Flexbox>
      </Section>

      <Section title="Direction: column-reverse">
        <Flexbox direction="column-reverse">
          <Button>first button</Button>
          <Spacing size="tiny" />
          <Button>second Button</Button>
        </Flexbox>
      </Section>
    </Fragment>
  ))
