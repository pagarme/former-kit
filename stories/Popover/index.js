import React from 'react'
import classNames from 'classnames'
import { storiesOf } from '@storybook/react'

import {
  Popover,
} from '../../src/Popover'

import {
  Grid,
  Row,
  Col,
} from '../../src/Grid'

import Button from '../../src/Button'
import Section from '../Section'

import Menu from './Menu'
import PopoverControl from './PopoverControl'

import style from './style.css'

const PopoverExample = ({ base, placement }) => (
  <Popover
    content={<Menu />}
    base={base}
    placement={placement}
  >
    <Button>click me</Button>
  </Popover>
)

const PopoverVisible = ({ placement, text }) => (
  <Popover
    content={<Menu />}
    placement={placement}
    visible
  >
    <Button>
      {text}
    </Button>
  </Popover>
)

storiesOf('Popover', module)
  .add('Default', () => (
    <Section>
      <PopoverExample />
    </Section>
  ))
  .add('With base dark', () => (
    <Section>
      <PopoverExample base="dark" />
    </Section>
  ))
  .add('Positions', () => (
    <Section>
      <Grid>
        <Row>
          <Col className={style.col} palm={12} tablet={4} desk={4} tv={4}>
            <h3>Right start</h3>
            <PopoverExample placement="rightStart" />

            <h3>Right Middle</h3>
            <PopoverExample placement="rightMiddle" />

            <h3>Right end</h3>
            <PopoverExample placement="rightEnd" />

            <h3>Top start</h3>
            <PopoverExample placement="topStart" />
          </Col>

          <Col className={style.col} palm={12} tablet={4} desk={4} tv={4}>
            <h3>Bottom start</h3>
            <PopoverExample placement="bottomStart" />

            <h3>Bottom center</h3>
            <PopoverExample placement="bottomCenter" />

            <h3>Bottom end</h3>
            <PopoverExample placement="bottomEnd" />

            <h3>Top center</h3>
            <PopoverExample placement="topCenter" />
          </Col>

          <Col className={style.col} palm={12} tablet={4} desk={4} tv={4}>
            <h3>Left start</h3>
            <PopoverExample placement="leftStart" />

            <h3>Left middle</h3>
            <PopoverExample placement="leftMiddle" />

            <h3>Left end</h3>
            <PopoverExample placement="leftEnd" />

            <h3>Top end</h3>
            <PopoverExample placement="topEnd" />
          </Col>
        </Row>
      </Grid>
    </Section>
  ))
  .add('Visible', () => (
    <Section>
      <div className={style.items}>
        <PopoverVisible placement="rightStart" text="Right start" />
      </div>

      <div className={style.items}>
        <PopoverVisible placement="rightMiddle" text="Right middle" />
      </div>

      <div
        className={classNames(
          style.items,
          style.itemsEnd
        )}
      >
        <PopoverVisible placement="rightEnd" text="Right end" />
      </div>

      <div className={classNames(style.items, style.itemsLeft)}>
        <PopoverVisible placement="leftStart" text="Left start" />
      </div>

      <div className={classNames(style.items, style.itemsLeft)}>
        <PopoverVisible placement="leftMiddle" text="Left middle" />
      </div>

      <div
        className={classNames(
          style.items,
          style.itemsLeft,
          style.itemsEnd
        )}
      >
        <PopoverVisible placement="leftEnd" text="Left end" />
      </div>

      <div
        className={classNames(
          style.items,
          style.itemsTop,
          style.itemsVerticalStart
        )}
      >
        <PopoverVisible placement="topStart" text="Top start" />
      </div>

      <div
        className={classNames(
          style.items,
          style.itemsTop,
          style.itemsVerticalCenter
        )}
      >
        <PopoverVisible placement="topCenter" text="Top center" />
      </div>

      <div
        className={classNames(
          style.items,
          style.itemsTop,
          style.itemsVerticalEnd
        )}
      >
        <PopoverVisible placement="topEnd" text="Top end" />
      </div>

      <div
        className={classNames(
          style.items,
          style.itemsBottomStart
        )}
      >
        <PopoverVisible placement="bottomStart" text="Bottom start" />
      </div>

      <div
        className={classNames(
          style.items
        )}
      >
        <PopoverVisible placement="bottomCenter" text="Bottom center" />
      </div>

      <div
        className={classNames(
          style.items
        )}
      >
        <PopoverVisible placement="bottomEnd" text="Bottom end" />
      </div>
    </Section>
  ))
  .add('Handle close popover', () => (
    <Section>
      <PopoverControl />
    </Section>
  ))
  .add('Don\'t close popover when click outside', () => (
    <Section>
      <Popover
        closeWhenClickOutside={false}
        content={<Menu />}
        placement="rightStart"
      >
        <Button>
          Open Popover
        </Button>
      </Popover>
    </Section>
  ))
