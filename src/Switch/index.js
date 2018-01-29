import React from 'react'
import {
  bool,
  func,
  shape,
  string,
} from 'prop-types'

import classnames from 'classnames'
import ThemeConsumer from '../ThemeConsumer'

const defaultStrings = {
  on: 'on',
  off: 'off',
}

function getStrings (strings) {
  return {
    ...defaultStrings,
    ...strings,
  }
}

const consumeTheme = ThemeConsumer('UISwitch')

function Switch ({
  disabled,
  onChange,
  checked,
  strings,
  theme,
}) {
  const className = classnames(
    theme.switch,
    {
      [theme.checked]: checked,
      [theme.disabled]: disabled,
    }
  )

  const { on, off } = getStrings(strings)

  return (
    <div className={className}>
      <input
        checked={checked}
        type="checkbox"
        onChange={() => !disabled && onChange(!checked)}
      />
      <span>
        {checked ? on : off }
      </span>
    </div>
  )
}

Switch.propTypes = {
  theme: shape({
    switch: string,
    checked: string,
    disabled: string,
  }),
  disabled: bool,
  onChange: func.isRequired,
  checked: bool,
  strings: shape({
    on: string,
    off: string,
  }),
}

Switch.defaultProps = {
  theme: {},
  disabled: false,
  checked: false,
  strings: defaultStrings,
}

export default consumeTheme(Switch)
