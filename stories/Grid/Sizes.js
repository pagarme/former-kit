import React from 'react'

import { storiesOf } from '@storybook/react'
import { range } from 'ramda'

import { Grid, Row, Col } from '../../src/Grid'
import CardSample from './CardSample'
import Section from '../Section'

import style from './style.css'

const maxColumns = 12

storiesOf('Grid', module)
  .add('Column sizes', () => (
    <Section className={style.background}>
      <Grid>
        {range(0, maxColumns).reverse().map(size => (
          <Row key={size}>
            <Col
              tv={maxColumns - size}
              desk={maxColumns - size}
              tablet={maxColumns - size}
              palm={maxColumns - size}
            >
              <CardSample size={maxColumns - size} />
            </Col>
          </Row>
        ))}
      </Grid>
    </Section>
  ))
