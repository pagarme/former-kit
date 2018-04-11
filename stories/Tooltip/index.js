import React from 'react'
import classNames from 'classnames'
import { storiesOf } from '@storybook/react'

import Tooltip from '../../src/Tooltip'
import Section from '../Section'

import {
  Grid,
  Row,
  Col,
} from '../../src/Grid'

import Button from '../../src/Button'

import style from './style.css'

const lipsum = `
Lorem ipsum dolor sit amet consectetur adipisicing elit.
Deleniti officia ipsam consectetur laudantium eius asperiores ut
maiores corporis, consequuntur natus quae tempora voluptate dolorum
voluptatibus placeat itaque alias, nam culpa.
`

const TooltipText = ({ placement, visible }) => (
  <Tooltip
    placement={placement}
    content={lipsum}
    visible={visible}
  >
    <Button>Hover me</Button>
  </Tooltip>
)

const TooltipVisible = ({ placement }) => (
  <Tooltip
    placement={placement}
    content="Lorem ipsum dolor sit amet consectetur adipisicing elit."
    visible
  >
    <Button>Hover me</Button>
  </Tooltip>
)

storiesOf('Tooltip', module)
  .add('Default', () => (
    <Section>
      <Grid>
        <Row>
          <Col className={style.col} palm={12} tablet={4} desk={4} tv={4}>
            <h3>Right start</h3>
            <TooltipText placement="rightStart" />

            <h3>Right middle</h3>
            <TooltipText placement="rightMiddle" />

            <h3>Right end</h3>
            <TooltipText placement="rightEnd" />

            <h3>Top start</h3>
            <TooltipText placement="topStart" />
          </Col>

          <Col className={style.col} palm={12} tablet={4} desk={4} tv={4}>
            <h3>Bottom start</h3>
            <TooltipText placement="bottomStart" />

            <h3>Bottom center</h3>
            <TooltipText placement="bottomCenter" />

            <h3>Bottom end</h3>
            <TooltipText placement="bottomEnd" />

            <h3>Top center</h3>
            <TooltipText placement="topCenter" />
          </Col>

          <Col className={style.col} palm={12} tablet={4} desk={4} tv={4}>
            <h3>Left start</h3>
            <TooltipText placement="leftStart" />

            <h3>Left middle</h3>
            <TooltipText />

            <h3>Left end</h3>
            <TooltipText placement="leftEnd" />

            <h3>Top end</h3>
            <TooltipText placement="topEnd" />
          </Col>
        </Row>
      </Grid>
    </Section>
  ))
  .add('Visible', () => (
    <Section>
      <div className={style.items}>
        <h3>Right start</h3>
        <TooltipVisible placement="rightStart" />
      </div>

      <div className={style.items}>
        <h3>Right middle</h3>
        <TooltipVisible placement="rightMiddle" />
      </div>

      <div className={style.items}>
        <h3>Right end</h3>
        <TooltipVisible placement="rightEnd" />
      </div>

      <div
        className={classNames(
          style.items,
          style.itemsLeft
        )}
      >
        <h3>Left start</h3>
        <TooltipVisible placement="leftStart" />
      </div>

      <div
        className={classNames(
          style.items,
          style.itemsLeft,
          style.leftMiddle
        )}
      >
        <h3>Left middle</h3>
        <TooltipVisible placement="leftMiddle" />
      </div>

      <div
        className={classNames(
          style.items,
          style.itemsLeft,
          style.leftBottom
        )}
      >
        <h3>Lef end</h3>
        <TooltipVisible placement="leftEnd" />
      </div>

      <div
        className={classNames(
          style.items,
          style.itemsTop,
          style.itemsVertical
        )}
      >
        <h3>Top start</h3>
        <TooltipVisible placement="topStart" />
      </div>

      <div
        className={classNames(
          style.items,
          style.itemsTop,
          style.itemsVertical,
          style.topCenter
        )}
      >
        <h3>Top center</h3>
        <TooltipVisible placement="topCenter" />
      </div>

      <div
        className={classNames(
          style.items,
          style.itemsTop,
          style.itemsVertical,
          style.topEnd
        )}
      >
        <h3>Top end</h3>
        <TooltipVisible placement="topEnd" />
      </div>

      <div
        className={classNames(
          style.items,
          style.itemsVertical
        )}
      >
        <h3>Bottom start</h3>
        <TooltipVisible placement="bottomStart" />
      </div>

      <div
        className={classNames(
          style.items,
          style.itemsVertical,
          style.topCenter
        )}
      >
        <h3>Bottom center</h3>
        <TooltipVisible placement="bottomCenter" />
      </div>

      <div
        className={classNames(
          style.items,
          style.itemsVertical,
          style.topEnd
        )}
      >
        <h3>Bottom end</h3>
        <TooltipVisible placement="bottomEnd" />
      </div>
    </Section>
  ))
