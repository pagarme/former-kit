import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { isNil } from 'ramda'

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
  const rippleX = (clientX || 0) - (left || 0) - (centralize || 0)
  const rippleY = (clientY || 0) - (top || 0) - (centralize || 0)

  return {
    rippleHeight: rippleSize,
    rippleWidth: rippleSize,
    rippleX,
    rippleY,
  }
}

const createSpinnerClasses = ({
  alignment,
  children,
  displayChildrenWhenLoading,
  icon,
  loading,
  theme,
}) => {
  const alignmentClass = alignment === 'end' ? 'endAlign' : 'startAlign'
  return classNames(
    theme.spinner,
    theme[alignmentClass],
    {
      [theme.spinnerOnly]: icon && loading && !children,
      [theme.absolute]: !displayChildrenWhenLoading && loading && children,
    }
  )
}

/**
 * Simple HTML button in a beautiful skin.
 */
const Button = ({
  children,
  circle,
  disabled,
  displayChildrenWhenLoading,
  fill,
  fullWidth,
  icon,
  iconAlignment,
  loading,
  onClick,
  relevance,
  size,
  theme,
  type,
}) => {
  const [ripple, setRipple] = useState({
    rippleHeight: 0,
    rippleWidth: 0,
    rippleX: 0,
    rippleY: 0,
  })

  const handleClick = (e) => {
    setRipple(createRipple(e))

    if (onClick) {
      onClick(e)
    }
  }

  const shouldRenderIconAt = (alignment) => {
    if (!isNil(children) && displayChildrenWhenLoading && loading) {
      return false
    }

    return !isNil(icon) && iconAlignment === alignment
  }

  const renderLoaderSpinnerAt = (alignment) => {
    if (loading && iconAlignment === alignment) {
      return (
        <span className={createSpinnerClasses({
          alignment,
          children,
          displayChildrenWhenLoading,
          icon,
          loading,
          theme,
        })}
        />
      )
    }

    return null
  }

  const buttonClasses = classNames(
    theme.button,
    theme[fill],
    theme[`${relevance}Relevance`],
    theme[size],
    {
      [theme.iconButton]: !isNil(icon) && isNil(children),
      [theme.circle]: !isNil(icon) && isNil(children) && circle,
      [theme.hiddenChildren]: !displayChildrenWhenLoading && loading,
      [theme.fullWidth]: fullWidth,
    }
  )

  /* eslint-disable react/button-has-type */
  return (
    <button
      disabled={disabled}
      className={buttonClasses}
      onClick={handleClick}
      type={type}
    >

      { shouldRenderIconAt('start') && icon }

      { renderLoaderSpinnerAt('start') }

      { !isNil(children) && <span>{children}</span> }

      { renderLoaderSpinnerAt('end') }

      { shouldRenderIconAt('end') && icon }

      <span
        className={theme.ripple}
        style={{
          height: ripple.rippleHeight,
          left: ripple.rippleX,
          top: ripple.rippleY,
          width: ripple.rippleWidth,
        }}
      />
    </button>
  )
  /* eslint-enable react/button-has-type */
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
   * Applies border radius to the Button icon.
   */
  circle: PropTypes.bool,
  /**
   * Disables the button.
   */
  disabled: PropTypes.bool,
  /**
   * Displays icon and text with an overlay loading spinner. If false, does not
   * display icon and children while loading.
   */
  displayChildrenWhenLoading: PropTypes.bool,
  /**
   * Defines fill style.
   */
  fill: PropTypes.oneOf([
    'flat', 'outline', 'clean',
  ]),
  /**
  * Defines if button have full width.
  */
  fullWidth: PropTypes.bool,
  /**
   * Custom icon which stays on the left or right side of the input.
   */
  icon: PropTypes.element,
  /**
   * Defines icon alignment.
   */
  iconAlignment: PropTypes.oneOf([
    'start', 'end',
  ]),
  /**
   * Indicates if the button is at loading state.
   */
  loading: PropTypes.bool,
  /**
   * The `onClick` prop is triggered when the button is clicked.
   */
  onClick: PropTypes.func,
  /**
   * Defines relevance resulting in different colors. By default high is red,
   * normal is green and low is grey.
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
    fullWidth: PropTypes.string,
    hiddenChildren: PropTypes.string,
    highRelevance: PropTypes.string,
    huge: PropTypes.string,
    iconButton: PropTypes.string,
    lowRelevance: PropTypes.string,
    normalRelevance: PropTypes.string,
    outline: PropTypes.string,
    ripple: PropTypes.string,
    size: PropTypes.string,
    spinner: PropTypes.string,
    tiny: PropTypes.string,
  }),
  /**
   * Defines the button type. For forms, you can use 'submit' and 'reset'. For general
   * use, 'button'.
   */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
}

Button.defaultProps = {
  children: null,
  circle: false,
  disabled: false,
  displayChildrenWhenLoading: false,
  fill: 'flat',
  fullWidth: false,
  icon: null,
  iconAlignment: 'start',
  loading: false,
  onClick: null,
  relevance: 'normal',
  size: 'default',
  theme: {},
  type: 'button',
}

export default Button
