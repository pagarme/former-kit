import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import style from './style.css'
import { Transition } from '../index'
import Button from '../../Button'
import {
  Col,
  Grid,
  Row,
} from '../../Grid'

class TransitionState extends PureComponent {
  constructor () {
    super()

    this.state = {
      animating: false,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    const { animating } = this.state
    this.setState({
      animating: !animating,
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
                {animating && (
                  <div
                    key="animation"
                    className={style.animation}
                  >
                    <h3>Example</h3>
                  </div>
                )}
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

export default TransitionState
