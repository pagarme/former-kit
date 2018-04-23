import React, { Fragment } from 'react'
import classNames from 'classnames'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  Popover,
  PopoverMenu,
} from '../../src/Popover'

import {
  Header,
  HeaderContent,
  HeaderMenu,
  HeaderTitle,
} from '../../src/Header'

import {
  Grid,
  Row,
  Col,
} from '../../src/Grid'

import Button from '../../src/Button'
import Section from '../Section'

import style from './style.css'

const items = [
  {
    title: 'Minha Conta',
    action: () => action('account'),
  },
  {
    title: 'Logout',
    action: () => action('logout'),
  },
]

const Menu = () => (
  <Fragment>
    <div>
      <strong>test@email.com</strong>
      <small>Admin</small>
    </div>
    <PopoverMenu items={items} />
  </Fragment>
)

const PopoverExample = ({ placement, base }) => (
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
  .add('With header', () => (
    <Header>
      <HeaderTitle>
        Popover
      </HeaderTitle>

      <HeaderContent>
        <Popover
          content={
            <Fragment>
              <div>
                <strong>teste@email.com</strong>
                <small>Administrador</small>
              </div>
              <PopoverMenu items={items} />
            </Fragment>
          }
          placement="bottomEnd"
        >
          <HeaderMenu onClick={() => null}>
            <span>click me</span>
          </HeaderMenu>
        </Popover>
      </HeaderContent>
    </Header>
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
