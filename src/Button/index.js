import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { isNil } from 'ramda'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIButton')

/**
 * Simple html button in a beautifull skin.
 */
function Button ({
  base,
  children,
  disabled,
  fill,
  icon,
  onClick,
  relevance,
  size,
  theme,
  type,
}) {
  const buttonClasses = classNames(
    theme.button,
    theme[fill],
    theme[base],
    theme[`${relevance}Relevance`],
    theme[size],
    {
      [theme.iconButton]: !isNil(icon) && isNil(children),
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
   * @see [ThemeProvider](#themeprovider) - Theme received from consumeTheme wrapper
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
    light: PropTypes.string,
    dark: PropTypes.string,
    tiny: PropTypes.string,
    small: PropTypes.string,
    default: PropTypes.string,
    large: PropTypes.string,
  }),
  /**
   * The contrast of the background where this component is applied.
   */
  base: PropTypes.oneOf([
    'dark', 'light',
  ]),
  /**
   * The children element.
   */
  children: PropTypes.string,
  /**
   * The prop that indicates if the Button is disabled or not.
   */
  disabled: PropTypes.bool,
  /**
   * The styles of color the Button can have.
   */
  fill: PropTypes.oneOf([
    'flat', 'gradient', 'outline', 'clean',
  ]),
  /**
   * Custom icon which stays on the left side of the input.
   */
  icon: PropTypes.element,
  /**
   * The onClick prop is triggered when the button is clicked.
   */
  onClick: PropTypes.func,
  /**
   * The prop that indicates the component's color relevance.
   */
  relevance: PropTypes.oneOf([
    'high', 'normal', 'low',
  ]),
  /**
   * Component's size
   */
  size: PropTypes.oneOf([
    'tiny', 'small', 'default', 'large',
  ]),
  /**
   * Button's type
   */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
}

Button.defaultProps = {
  base: 'light',
  children: null,
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
