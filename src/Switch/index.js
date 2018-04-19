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
/**
 * Binary value selector, used mainly when you need a true
 * or false condition.
 * Triggers a received onChange function when a value is
 * changed and returns a boolean value
 */
const Switch = ({
  checked,
  disabled,
  name,
  onChange,
  strings,
  theme,
}) => {
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
        name={name}
        onChange={() => !disabled && onChange(!checked)}
        type="checkbox"
      />
      <span>
        {checked ? on : off }
      </span>
    </div>
  )
}

Switch.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
  */
  theme: shape({
    switch: string,
    checked: string,
    disabled: string,
  }),
  /**
   * Prop used to tell if the component is checked or not.
  */
  checked: bool,
  /**
   * Prop used to tell if the component is disabled or not.
  */
  disabled: bool,
  /**
   * Name to give to the input
  */
  name: string,
  /** The callback called when the Switch receives a click.
   * @param {boolean} checked - returns the inverse of the 'checked' prop.
  */
  onChange: func.isRequired,
  /**
   * Texts used to the i18n of the component.
  */
  strings: shape({
    /**
     * The message that is shown when the component is active.
    */
    on: string,
    /**
     * The message that is shown when the component is not active.
    */
    off: string,
  }),
}

Switch.defaultProps = {
  theme: {},
  checked: false,
  disabled: false,
  name: '',
  strings: defaultStrings,
}

export default consumeTheme(Switch)
