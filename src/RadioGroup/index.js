import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import shortid from 'shortid'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIRadioGroup')

/**
 * Group of radio buttons which allows the user to select only one option.
 * Works like the native HTML 'radio' element grouped by name.
 */
class RadioGroup extends React.Component {
  constructor (props) {
    super(props)

    this.instanceId = `radio-group-${shortid.generate()}`
  }

  render () {
    const {
      name,
      disabled,
      error,
      success,
      options,
      value,
      theme,
      onChange,
    } = this.props

    const containerClass = classnames(theme.container, {
      [theme.disabled]: disabled,
      [theme.error]: error,
      [theme.success]: success,
    })

    const radioButtons = options.map((option, index) => (
      <label
        key={option.value}
        className={theme.label}
        htmlFor={`${this.instanceId}-${option.value}-${index}`}
      >
        <input
          type="radio"
          name={name}
          value={option.value}
          id={`${this.instanceId}-${option.value}-${index}`}
          checked={
            (disabled && index === 0) ||
              (value === option.value)
          }
          onChange={event => !disabled && onChange(event)}
          className={theme.input}
          disabled={disabled}
        />

        <span className={theme.title}>
          {option.name}
        </span>
      </label>
    ))

    return (
      <div className={containerClass}>
        {radioButtons}
        {(success || error) &&
          <p
            className={theme.secondaryText}
          >
            {success || error}
          </p>
        }
      </div>
    )
  }
}

RadioGroup.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    disabled: PropTypes.string,
    error: PropTypes.string,
    radio: PropTypes.string,
    radioGroup: PropTypes.string,
    secondaryText: PropTypes.string,
    label: PropTypes.string,
  }),
  /**
   * Set of items which will compose the options in the component.
   * The name will be shown in the component and the value is passed as
   * an argument in the callbacks.
   */
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  /**
   * Group name used to group the input radios and to distinguish the group.
   */
  name: PropTypes.string.isRequired,
  /**
   * Callback triggered when an option is selected.
   * @param {object} event
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Selected value.
   */
  value: PropTypes.string,
  /**
   * Disables/enables the component's functions.
   */
  disabled: PropTypes.bool,
  /**
   * Error message which adds error styles. It stays below the component.
   */
  error: PropTypes.string,
  /**
   * Success message which adds success styles. It stays below the component.
   */
  success: PropTypes.string,
}

RadioGroup.defaultProps = {
  theme: {},
  value: '',
  disabled: false,
  error: '',
  success: '',
}

export default consumeTheme(RadioGroup)
