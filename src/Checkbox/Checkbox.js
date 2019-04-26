import React from 'react'
import {
  bool,
  func,
  shape,
  string,
} from 'prop-types'

import classNames from 'classnames'
/**
 * Custom checkbox component, which works like the native HTML 'checkbox'
 * element, but with an awesome skin.
 */
const Checkbox = ({
  checked,
  disabled,
  error,
  label,
  name,
  onChange,
  theme,
  value,
}) => {
  const containerClass = classNames(
    theme.checkbox,
    {
      [theme.disabled]: disabled,
      [theme.error]: error,
    }
  )

  return (
    <div className={containerClass}>
      <label
        htmlFor={`${name}-${value}`}
        className={theme.label}
      >
        <input
          type="checkbox"
          name={name}
          value={value}
          id={`${name}-${value}`}
          checked={checked}
          disabled={disabled}
          onChange={e => !disabled && onChange(e.target.value)}
        />

        <span className={theme.input} />

        <span className={theme.title}>
          {label}
        </span>
      </label>

      {error && (
        <p className={theme.secondaryText}>{error}</p>
      )}
    </div>
  )
}

Checkbox.propTypes = {
  /**
   * Same as the `checked` value prop from the HTML checkbox.
   */
  checked: bool.isRequired,
  /**
   * Same as the `disabled` value prop from the HTML checkbox.
   */
  disabled: bool,
  /**
   * Error message which sets error classes to the component.
   */
  error: string,
  /**
   * Component text which will trigger events related to the checkbox input.
   */
  label: string.isRequired,
  /**
   * Same as the native `name` prop from the HTML checkbox.
   */
  name: string.isRequired,
  /**
   * Triggers when the checkbox or label is clicked.
   */
  onChange: func.isRequired,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: shape({
    check: string,
    checkbox: string,
    disabled: string,
    error: string,
    label: string,
    secondaryText: string,
  }),
  /**
   * Same as the native `value` prop from the HTML checkbox.
   */
  value: string.isRequired,
}

Checkbox.defaultProps = {
  disabled: false,
  error: '',
  theme: {},
}

export default Checkbox
