import React from 'react'
import {
  bool,
  func,
  shape,
  string,
} from 'prop-types'

import classNames from 'classnames'

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
  theme: shape({
    checkbox: string,
    check: string,
    disabled: string,
    secondaryText: string,
    success: string,
    error: string,
  }),
  name: string.isRequired,
  value: string.isRequired,
  label: string.isRequired,
  checked: bool.isRequired,
  onChange: func.isRequired,
  disabled: bool,
  error: string,
  success: string,
}

Checkbox.defaultProps = {
  theme: {},
  disabled: false,
  error: '',
  success: '',
}

export default Checkbox
