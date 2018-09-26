import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { isNil } from 'ramda'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIButton')

const createRipple = (e) => {
  const {
    clientX,
    clientY,
    currentTarget,
  } = e

  const { offsetHeight, offsetWidth } = currentTarget
  const { left, top } = currentTarget.getBoundingClientRect()

  const rippleSize = Math.max(offsetHeight, offsetWidth)
  const centralize = rippleSize / 2
  const rippleX = clientX - left - centralize
  const rippleY = clientY - top - centralize

  return {
    rippleHeight: rippleSize,
    rippleWidth: rippleSize,
    rippleX,
    rippleY,
  }
}

/**
 * Simple HTML button in a beautiful skin.
 */
class Button extends PureComponent {
  constructor () {
    super()

    this.state = {
      rippleX: 0,
      rippleY: 0,
      rippleHeight: 0,
      rippleWidth: 0,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    const {
      rippleHeight,
      rippleWidth,
      rippleX,
      rippleY,
    } = createRipple(e)

    this.setState({
      rippleX,
      rippleY,
      rippleHeight,
      rippleWidth,
    })

    if (this.props.onClick) {
      this.props.onClick()
    }
  }

  render () {
    const {
      children,
      circle,
      disabled,
      fill,
      icon,
      iconAlignment,
      relevance,
      size,
      theme,
      type,
    } = this.props

    const {
      rippleHeight,
      rippleWidth,
      rippleX,
      rippleY,
    } = this.state

    const buttonClasses = classNames(
      theme.button,
      theme[fill],
      theme[`${relevance}Relevance`],
      theme[size],
      {
        [theme.iconButton]: !isNil(icon) && isNil(children),
        [theme.circle]: !isNil(icon) && isNil(children) && circle,
      }
    )

    return (
      <button
        disabled={disabled}
        className={buttonClasses}
        onClick={this.handleClick}
        type={type}
      >
        {(!isNil(icon) && iconAlignment === 'start') && icon}
        {!isNil(children) && <span>{children}</span>}
        {(!isNil(icon) && iconAlignment === 'end') && icon}

        <span
          className={theme.ripple}
          style={{
            height: rippleHeight,
            left: rippleX,
            top: rippleY,
            width: rippleWidth,
          }}
        />
      </button>
    )
  }
}

Button.propTypes = {
  /**
   * The children element.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  /**
   * It changes the border-radius of the icon Button.
   */
  circle: PropTypes.bool,
  /**
   * The prop that indicates if the button is disabled or not.
   */
  disabled: PropTypes.bool,
  /**
   * The styles of color the button can have.
   */
  fill: PropTypes.oneOf([
    'flat', 'gradient', 'outline', 'clean',
  ]),
  /**
   * Custom icon which stays on the left or right side of the input.
   */
  icon: PropTypes.element,
  /**
   * The prop that indicates the icon alignment.
   */
  iconAlignment: PropTypes.oneOf([
    'start', 'end',
  ]),
  /**
   * The `onClick` prop is triggered when the button is clicked.
   */
  onClick: PropTypes.func,
  /**
   * The prop that indicates the component's color relevance.
   */
  relevance: PropTypes.oneOf([
    'high', 'normal', 'low',
  ]),
  /**
   * Component's size.
   */
  size: PropTypes.oneOf([
    'tiny', 'default', 'huge',
  ]),
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    button: PropTypes.string,
    circle: PropTypes.string,
    clean: PropTypes.string,
    default: PropTypes.string,
    disabled: PropTypes.string,
    flat: PropTypes.string,
    gradient: PropTypes.string,
    highRelevance: PropTypes.string,
    huge: PropTypes.string,
    lowRelevance: PropTypes.string,
    normalRelevance: PropTypes.string,
    outline: PropTypes.string,
    ripple: PropTypes.string,
    size: PropTypes.string,
    tiny: PropTypes.string,
  }),
  /**
   * Button's type.
   */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
}

Button.defaultProps = {
  children: null,
  circle: false,
  disabled: false,
  fill: 'flat',
  icon: null,
  iconAlignment: 'start',
  onClick: null,
  relevance: 'normal',
  size: 'default',
  theme: {},
  type: 'button',
}

export default consumeTheme(Button)
