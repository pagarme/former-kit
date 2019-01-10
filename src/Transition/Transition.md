#### **Examples** ####

```jsx static
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

export default TransitionState
```
<br />

Fade
```jsx
  const TransitionState = require('./example/TransitionState').default;
  const fade = require('./animation/fade').default;

  <TransitionState
    atActive={fade.atActive}
    atEnter={fade.atEnter}
    atLeave={fade.atLeave}
    mapStyles={fade.mapStyles}
    springOptions={fade.springOptions}
  />
```

Grow
```jsx
  const TransitionState = require('./example/TransitionState').default;
  const grow = require('./animation/grow').default;

  <TransitionState
    atActive={grow.atActive}
    atEnter={grow.atEnter}
    atLeave={grow.atLeave}
    mapStyles={grow.mapStyles}
    springOptions={grow.springOptions}
  />
```
Zoom
```jsx
  const TransitionState = require('./example/TransitionState').default;
  const zoom = require('./animation/zoom').default;

  <TransitionState
    atActive={zoom.atActive}
    atEnter={zoom.atEnter}
    atLeave={zoom.atLeave}
    mapStyles={zoom.mapStyles}
    springOptions={zoom.springOptions}
  />
```
