
import React from 'react'

import { storiesOf } from '@storybook/react'
import { range } from 'ramda'

import { Grid, Row, Col } from '../../src/Grid'
import CardSample from './CardSample'
import Section from '../Section'

import style from './style.css'

const maxColumns = 12
const equalDistributionExamples = [1, 2, 3, 4, 6, 12]

storiesOf('Grid', module)
  .add('Proportional sizes', () => (
    <Section className={style.background}>
      <Grid>
        {equalDistributionExamples.map(size => (
          <Row key={size}>
            {range(1, size + 1).map(i => (
              <Col
                key={i}
                tv={maxColumns / size}
                desk={maxColumns / size}
                tablet={maxColumns / size}
                palm={maxColumns / size}
              >
                <CardSample size={maxColumns / size} />
              </Col>
            ))}
          </Row>
        ))}
      </Grid>
    </Section>
  ))
