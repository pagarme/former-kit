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
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
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
   * Same as the native `name` prop from the HTML checkbox.
   */
  name: string.isRequired,
  /**
   * Same as the native `value` prop from the HTML checkbox.
   */
  value: string.isRequired,
  /**
   * Component text which will trigger events related to the checkbox input.
   */
  label: string.isRequired,
  /**
   * Same as the `checked` value prop from the HTML checkbox.
   */
  checked: bool.isRequired,
  /**
   * Triggers when the checkbox or label is clicked.
   */
  onChange: func.isRequired,
  /**
   * Same as the `disabled` value prop from the HTML checkbox.
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
