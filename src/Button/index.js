import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { themr } from 'react-css-themr'
import { isNil } from 'ramda'

const applyThemr = themr('UIButton')

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
  base: PropTypes.oneOf([
    'dark', 'light',
  ]),
  children: PropTypes.string,
  disabled: PropTypes.bool,
  fill: PropTypes.oneOf([
    'flat', 'gradient', 'outline', 'clean',
  ]),
  icon: PropTypes.element,
  onClick: PropTypes.func,
  relevance: PropTypes.oneOf([
    'high', 'normal', 'low',
  ]),
  size: PropTypes.oneOf([
    'tiny', 'small', 'default', 'large',
  ]),
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

export default applyThemr(Button)
