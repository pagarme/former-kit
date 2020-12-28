import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIRadio')

const Radio = ({
  checked,
  disabled,
  id,
  label,
  name,
  onChange,
  size,
  theme,
  value,
}) => {
  const labelClass = classnames(theme.label, {
    [theme.disabled]: disabled,
  })

  const inputClass = classnames(theme.input, {
    [theme.default]: size === 'default',
    [theme.huge]: size === 'huge',
  })

  return (
    <label
      key={value}
      className={labelClass}
      htmlFor={id}
    >
      <input
        type="radio"
        name={name}
        value={value}
        id={id}
        checked={checked}
        onChange={event => !disabled && onChange(event)}
        disabled={disabled}
      />

      <span className={inputClass} />

      <span className={theme.title}>
        {label}
      </span>
    </label>
  )
}

Radio.propTypes = {
  /**
   * Indicates whether or not the radio is checked.
   */
  checked: PropTypes.bool,
  /**
   * Disables or enables the radio.
   */
  disabled: PropTypes.bool,
  /**
   * Component's id.
   */
  id: PropTypes.string.isRequired,
  /**
   * Displayed label.
   */
  label: PropTypes.node,
  /**
   * Radio's name.
   */
  name: PropTypes.string.isRequired,
  /**
   * Callback triggered when the radio is selected.
   */
  onChange: PropTypes.func,
  /**
   * Indicates the radio size.
   */
  size: PropTypes.oneOf(['default', 'huge']),
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    default: PropTypes.string,
    disabled: PropTypes.string,
    huge: PropTypes.string,
    input: PropTypes.string,
    label: PropTypes.string,
    title: PropTypes.string,
  }),
  /**
   * Radio's value.
   */
  value: PropTypes.string.isRequired,
}

Radio.defaultProps = {
  checked: false,
  disabled: false,
  label: null,
  onChange: () => {},
  size: 'default',
  theme: {},
}

export default consumeTheme(Radio)
