import React from 'react'
import {
  bool,
  func,
  shape,
  string,
} from 'prop-types'

import classNames from 'classnames'
/**
 * Custom checkbox component, which works like the native html 'checkbox'
 * element, but with an awesome skin.
 */
const Checkbox = ({
  disabled,
  error,
  success,
  checked,
  name,
  theme,
  value,
  onChange,
  label,
}) => {
  const containerClass = classNames(
    theme.checkbox,
    {
      [theme.disabled]: disabled,
      [theme.error]: error,
      [theme.success]: success,
    }
  )

  return (
    <div className={containerClass}>
      <input
        type="checkbox"
        name={name}
        value={value}
        id={`${name}-${value}`}
        checked={checked}
        disabled={disabled}
        onChange={e => !disabled && onChange(e.target.value)}
      />
      <label
        htmlFor={`${name}-${value}`}
      >
        <i className={theme.check} />
        {label}
      </label>

      {(success || error) &&
        <p className={theme.secondaryText}>
          {success || error}
        </p>
      }
    </div>
  )
}

Checkbox.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from consumeTheme wrapper.
   */
  theme: shape({
    checkbox: string,
    check: string,
    disabled: string,
    secondaryText: string,
    success: string,
    error: string,
  }),
  /**
   * Same as the native prop 'name' the checkbox has.
   */
  name: string.isRequired,
  /**
   * Same as the native prop 'html' the checkbox has.
   */
  value: string.isRequired,
  /**
   * Component text which will trigger events related to the checkbox input.
   */
  label: string.isRequired,
  /**
   * Same as the native prop 'checked' the checkbox has.
   */
  checked: bool.isRequired,
  /**
   * Triggers when the checkbox or label is clicked.
   */
  onChange: func.isRequired,
  /**
   * Same as the native prop 'disabled' the checkbox has.
   */
  disabled: bool,
  /**
   * Error message which sets error classes to the component.
   */
  error: string,
  /**
   * Success message which sets success classes to the component.
   */
  success: string,
}

Checkbox.defaultProps = {
  theme: {},
  disabled: false,
  error: '',
  success: '',
}

export default Checkbox
