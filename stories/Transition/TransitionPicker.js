import React from 'react'
import {
  dissoc,
  either,
  isEmpty,
  isNil,
} from 'ramda'
import Button from '../../src/Button'
import { Transition } from '../../src/Transition'
import {
  Col,
  Grid,
  Row,
} from '../../src/Grid'
import Input from '../../src/Input/form'

import style from './style.css'

const defaultAnimationsStyles = {
  active: {
    transform: 0,
  },
  enter: {
    transform: 400,
  },
  leave: {
    transform: 0,
  },
  mapStyles: ({
    transform,
  }) => ({
    transform: `translate3d(${transform}px, 0, 0)`,
  }),
  springOptions: {
    damping: 26,
    precision: 0.01,
    stiffness: 170,
  },
}

const isValidValue = (prop, value) => {
  if (prop === 'damping') {
    return value > 0 && value <= 115
  }
  if (prop === 'precision') {
    return value > 0 && value <= 1
  }
  if (prop === 'stiffness') {
    return value > 0 && value <= 500
  }
  return true
}

const PROP_ERROR_MESSAGE = {
  damping: 'Damping must be an integer between 1 and 115',
  precision: 'Precision must be a value between 0 and 1',
  stiffness: 'Stiffness must be a value between 1 and 500',
}

const getPropErrorMesage = prop => PROP_ERROR_MESSAGE[prop]

export default class Demo extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      animationsStyles: defaultAnimationsStyles,
      errors: {},
    }

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handlePropChange = this.handlePropChange.bind(this)
  }

  handleMouseDown () {
    const { animationsStyles } = this.state
    this.setState({
      animationsStyles: {
        ...animationsStyles,
        active: animationsStyles.enter,
        enter: animationsStyles.active,
      },
    })
  }

  handlePropChange (prop, event) {
    const value = +event.target.value
    const { animationsStyles, errors } = this.state

    let newErrors

    if (!isValidValue(prop, value)) {
      newErrors = {
        ...errors,
        [prop]: getPropErrorMesage(prop),
      }
    } else {
      newErrors = dissoc(prop, errors)
    }

    this.setState({
      animationsStyles: {
        ...animationsStyles,
        springOptions: {
          ...animationsStyles.springOptions,
          [prop]: +event.target.value,
        },
      },
      errors: newErrors,
    })
  }

  render () {
    const {
      animationsStyles: {
        active,
        enter,
        leave,
        mapStyles,
        springOptions,
        springOptions: {
          damping,
          precision,
          stiffness,
        },
      },
      errors,
    } = this.state
    const isEmptyOrNill = either(isEmpty, isNil)

    const hasErrors = !isEmptyOrNill(errors)

    return (
      <Grid>
        <Row>
          <Col>
            <Input
              error={errors.damping}
              id="damping"
              label="Damping"
              max={115}
              maxLength={3}
              onChange={value => this.handlePropChange('damping', value)}
              type="number"
              value={`${damping}`}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              error={errors.precision}
              id="precision"
              label="Precision"
              maxLength={10}
              onChange={value => this.handlePropChange('precision', value)}
              type="number"
              value={`${precision}`}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              error={errors.stiffness}
              id="stiffness"
              label="Stiffness"
              max={500}
              maxLength={3}
              onChange={value => this.handlePropChange('stiffness', value)}
              type="number"
              value={`${stiffness}`}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              disabled={hasErrors}
              onClick={this.handleMouseDown}
            >
              Animate
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className={style.slide}>
              <Transition
                atActive={active}
                atEnter={enter}
                atLeave={leave}
                mapStyles={mapStyles}
                springOptions={springOptions}
              >
                <div
                  key="animatedBlock"
                  className={style.slider}
                />
              </Transition>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}
