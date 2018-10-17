import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'
import style from './style.css'
import Section from '../Section'
import {
  Fade,
  Grow,
  Transition,
  Zoom,
} from '../../src/Transition'
import Button from '../../src/Button'
import {
  Col,
  Grid,
  Row,
} from '../../src/Grid'

import Picker from './TransitionPicker'

class TransitionState extends PureComponent {
  constructor () {
    super()

    this.state = {
      animating: false,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState({
      animating: !this.state.animating,
    })
  }

  render () {
    const { animating } = this.state
    const {
      atActive,
      atEnter,
      atLeave,
      mapStyles,
      springOptions,
    } = this.props

    return (
      <Grid>
        <Row>
          <Col>
            <Button
              className={style.highZIndex}
              onClick={this.handleClick}
            >
              Click me
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className={style.contentAnchor}>
              <Transition
                atActive={atActive}
                atEnter={atEnter}
                atLeave={atLeave}
                mapStyles={mapStyles}
                springOptions={springOptions}
              >
                {animating &&
                  <div
                    key="animation"
                    className={style.animation}
                  >
                    <h3>Example</h3>
                  </div>
                }
              </Transition>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

TransitionState.propTypes = {
  atActive: PropTypes.objectOf(
    PropTypes.number
  ),
  atEnter: PropTypes.objectOf(
    PropTypes.number
  ),
  atLeave: PropTypes.objectOf(
    PropTypes.number
  ),
  mapStyles: PropTypes.func,
  springOptions: PropTypes.shape({
    damping: PropTypes.number,
    precision: PropTypes.number,
    stiffness: PropTypes.number,
  }),
}

TransitionState.defaultProps = {
  atActive: {},
  atEnter: {},
  atLeave: {},
  mapStyles: () => undefined,
  springOptions: {},
}

storiesOf('Transition', module)
  .add('Animation', () => (
    <Section>
      <Grid>
        <Row>
          <Col className={style.col} palm={12} tablet={4} desk={4} tv={4}>
            <h2>Fade</h2>
            <TransitionState
              atActive={Fade.atActive}
              atEnter={Fade.atEnter}
              atLeave={Fade.atLeave}
              mapStyles={Fade.mapStyles}
              springOptions={Fade.springOptions}
            />
          </Col>

          <Col className={style.col} palm={12} tablet={4} desk={4} tv={4}>
            <h2>Grow</h2>
            <TransitionState
              atActive={Grow.atActive}
              atEnter={Grow.atEnter}
              atLeave={Grow.atLeave}
              mapStyles={Grow.mapStyles}
              springOptions={Grow.springOptions}
            />
          </Col>

          <Col className={style.col} palm={12} tablet={4} desk={4} tv={4}>
            <h2>Zoom</h2>
            <TransitionState
              atActive={Zoom.atActive}
              atEnter={Zoom.atEnter}
              atLeave={Zoom.atLeave}
              mapStyles={Zoom.mapStyles}
              springOptions={Zoom.springOptions}
            />
          </Col>
        </Row>
      </Grid>
    </Section>
  ))
  .add('Picker', () => (
    <Section>
      <Picker />
    </Section>
  ))
