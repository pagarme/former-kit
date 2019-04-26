import React, {
  cloneElement,
  Component,
  Fragment,
} from 'react'
import { TransitionMotion, spring, presets } from 'react-motion'
import PropTypes from 'prop-types'
import {
  identity,
  is,
  map,
  mapObjIndexed,
  when,
} from 'ramda'

const applySpring = springPreset => val => spring(
  val,
  springPreset || presets.noWobble
)

const applySpringIfNumber = springOptions => when(
  is(Number),
  applySpring(springOptions)
)

const ensureSpring = (springOptions, styleOptions) => mapObjIndexed(
  applySpringIfNumber(springOptions),
  styleOptions
)

/**
 * Animation interface for react components animations.
 * This component is a simplier interface for the TransitionMotion component
 * from [react-motion](https://github.com/chenglou/react-motion).
 */
class Transition extends Component {
  constructor () {
    super()

    this.didLeave = this.didLeave.bind(this)
    this.getDefaultStyles = this.getDefaultStyles.bind(this)
    this.getStyles = this.getStyles.bind(this)
    this.renderChild = this.renderChild.bind(this)
    this.renderChildren = this.renderChildren.bind(this)
  }

  getDefaultStyles () {
    const {
      atEnter,
      children,
      runOnMount,
    } = this.props

    if (!runOnMount) {
      return null
    }

    if (!children) {
      return []
    }

    return [
      {
        data: children,
        key: children.key,
        style: atEnter,
      },
    ]
  }

  getStyles () {
    const { children } = this.props

    if (!children) {
      return []
    }

    const { atActive, springOptions } = this.props

    if (is(Array, children)) {
      return map(child => ({
        data: child,
        key: child.key,
        style: ensureSpring(springOptions, atActive),
      }), children)
    }

    const { key } = children
    if (!key) {
      // eslint-disable-next-line no-console
      console.warn('Transition child must have a key')
    }

    return [
      {
        data: children,
        key,
        style: ensureSpring(springOptions, atActive),
      },
    ]
  }

  didLeave (styleThatLeft) {
    const { didLeave } = this.props
    if (didLeave) {
      didLeave(styleThatLeft)
    }
  }

  renderChild (config) {
    const { mapStyles } = this.props
    const props = {
      key: config.key,
      style: mapStyles(config.style),
    }

    if (is(Array, config.data)) {
      return map(element => cloneElement(element, props), config.data)
    }

    return cloneElement(config.data, props)
  }

  renderChildren (interpolatedStyles) {
    return (
      <Fragment>
        {interpolatedStyles.map(this.renderChild)}
      </Fragment>
    )
  }

  render () {
    const { atEnter, atLeave, springOptions } = this.props
    return (
      <TransitionMotion
        defaultStyles={this.getDefaultStyles()}
        styles={this.getStyles()}
        willEnter={() => atEnter}
        willLeave={() => ensureSpring(springOptions, atLeave)}
        didLeave={this.didLeave}
      >
        {this.renderChildren}
      </TransitionMotion>
    )
  }
}

Transition.propTypes = {
  /**
   * This props represents the style props which will be reached for the
   * animation starting from the atEnter prop object as in the example:
   *
   * ```
   *   atEnter    --> intermediary state -->   atActive
   * { width: 0 }       { width: 0.5 }       { width: 1 }
   * ```
   */
  atActive: PropTypes.objectOf(
    PropTypes.number
  ),
  /**
   * This props represents the initial styles which will be received for the
   * animation and it be changed in the animations states as in the example:
   *
   * ```
   *   atEnter    --> intermediary state -->   atActive
   * { width: 0 }       { width: 0.5 }       { width: 1 }
   * ```
   */
  atEnter: PropTypes.objectOf(
    PropTypes.number
  ),
  /**
   * This props represents the style props which will be reached in the end of
   * the animation.
   * Starting the animation from the atActive state as in the example:
   *
   * ```
   *   atActive   --> intermediary state -->   atLeave
   * { width: 1 }      { width: 0.5 }        { width: 0 }
   * ```
   */
  atLeave: PropTypes.objectOf(
    PropTypes.number
  ),
  /**
   * The component which sill be animated, it will receive some inline stlyes
   * according with the values received in the atActive, atEnter, atLeave and
   * springOptions props and the current state.
   * The transition first child must have a **key** prop, because this keys is
   * used in the creation of the default syles.
   * Miss this key could trigger an validation error over the prop **styles**.
   */
  children: PropTypes.node,
  /**
   * A simple callback which runs after all the animation ends.
   */
  didLeave: PropTypes.func,
  /**
   * This prop receive a function which changes the interpolatedStyles
   * given to the animated component for each animation state,
   * it's very useful to adapt css props with mesure units like `vh` or `px`.
   */
  mapStyles: PropTypes.func,
  /**
   * Runs the animation when the component is mounted.
   */
  runOnMount: PropTypes.bool,
  /**
   * This is the main received property by this component it's responsible for
   * the animation states.
   * This prop must receive an object with the props damping, precision and
   * stiffness, all numbers which are passed to react-motion algorithms to
   * define the animation speed, frames and softness.
   */
  springOptions: PropTypes.shape({
    /**
     * This prop defines the animation damping.
     */
    damping: PropTypes.number,
    /**
     * Defines the rounding and the speed for the interpolatedStyles created
     * in the animations states.
     */
    precision: PropTypes.number,
    /**
     * Defines the stiffnes of the animation.
     */
    stiffness: PropTypes.number,
  }),
}

Transition.defaultProps = {
  atActive: {},
  atEnter: {},
  atLeave: {},
  children: null,
  didLeave: identity,
  mapStyles: identity,
  runOnMount: false,
  springOptions: presets.noWobble,
}

export default Transition
