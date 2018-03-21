import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { isNil } from 'ramda'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIButton')

/**
 * Simple HTML button in a beautiful skin.
 */
const Button = ({
  children,
  circle,
  disabled,
  fill,
  icon,
  onClick,
  relevance,
  size,
  theme,
  type,
}) => {
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
      onClick={onClick}
      type={type}
    >
      {!isNil(icon) && icon}
      {!isNil(children) && children}
    </button>
  )
}

Button.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    button: PropTypes.string,
    disabled: PropTypes.string,
    size: PropTypes.string,
    flat: PropTypes.string,
    gradient: PropTypes.string,
    outline: PropTypes.string,
    clean: PropTypes.string,
    highRelevance: PropTypes.string,
    normalRelevance: PropTypes.string,
    lowRelevance: PropTypes.string,
    tiny: PropTypes.string,
    default: PropTypes.string,
    huge: PropTypes.string,
    circle: PropTypes.string,
  }),
  /**
   * The children element.
   */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
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
   * Custom icon which stays on the left side of the input.
   */
  icon: PropTypes.element,
  /**
   * It changes the border-radius of the icon Button.
   */
  circle: PropTypes.bool,
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
  onClick: null,
  relevance: 'normal',
  size: 'default',
  theme: {},
  type: 'button',
}

export default consumeTheme(Button)
