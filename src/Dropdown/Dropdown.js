import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import shortid from 'shortid'

import {
  propEq,
  pipe,
  find,
  prop,
  defaultTo,
} from 'ramda'
/**
 * Single value selector which shows a list of selectable options.
 * A callback (received in props) is fired when an option is selected. The callback receives
 * the value for the option selected.
 */
class Dropdown extends React.Component {
  constructor (props) {
    super(props)

    this.instanceId = `${props.name}-${shortid.generate()}`
    this.handleChange = this.handleChange.bind(this)
    this.selectedName = this.selectedName.bind(this)
  }

  handleChange (event) {
    const { disabled, onChange } = this.props

    if (!disabled) {
      onChange(event)
    }
  }

  selectedName () {
    const {
      options,
      value,
    } = this.props

    const selected = pipe(
      find(propEq('value', value)),
      defaultTo({}),
      prop('name'),
      defaultTo(this.props.placeholder || 'Selecione')
    )

    return selected(options)
  }

  renderOptions () {
    const {
      theme,
      options,
      value,
    } = this.props

    return options.map(({ value: optValue, name }) => {
      const optionClasses = classNames(
        theme.option,
        {
          [theme.active]: value === optValue,
        }
      )

      return (
        <option
          key={optValue}
          className={optionClasses}
          value={optValue}
        >
          {name}
        </option>
      )
    })
  }

  render () {
    const {
      disabled,
      error,
      icons,
      label,
      placeholder,
      success,
      theme,
    } = this.props

    const rootClasses = classNames(
      theme.dropdown,
      {
        [theme.disabled]: disabled,
        [theme.error]: error,
        [theme.success]: success,
      }
    )

    const hasSecondaryText = theme.secondaryText && (success || error)
    const hasLabel = theme.label && label

    return (
      <div className={rootClasses}>
        {hasLabel &&
          <label
            htmlFor={this.instanceId}
            className={theme.label}
          >
            {label}
          </label>
        }

        <select
          id={this.instanceId}
          className={theme.select}
          onChange={this.handleChange}
          disabled={disabled}
          defaultValue="placeholder"
        >
          <option
            disabled
            hidden
            value="placeholder"
            className={classNames(theme.option, theme.placeholder)}
          >
            {placeholder}
          </option>
          {this.renderOptions()}
        </select>

        <span className={theme.arrow}>
          {icons.expand}
        </span>

        {hasSecondaryText &&
          <p className={theme.secondaryText}>
            {success || error}
          </p>
        }
      </div>
    )
  }
}

Dropdown.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from consumeTheme wrapper.
   */
  theme: PropTypes.shape({
    arrow: PropTypes.string,
    disabled: PropTypes.string,
    dropdown: PropTypes.string,
    error: PropTypes.string,
    select: PropTypes.string,
    placeholder: PropTypes.string,
    secondaryText: PropTypes.string,
    success: PropTypes.string,
  }),
  /**
   * Disables the component.
   */
  disabled: PropTypes.bool,
  /**
   * Error message which adds error classes to the component.
   * This message stays under the value selector.
   */
  error: PropTypes.string,
  /**
   * Default component icons. These icons must be changed in the theme.
   */
  icons: PropTypes.shape({
    /**
     * Icons at the right side of the selector.
     */
    expand: PropTypes.element,
  }),
  /**
   * Text used as placeholder until the component receives focus.
   * When the component is focused this text stays over the component.
   * This behavior is used only in the form component variant.
   */
  label: PropTypes.string,
  /**
   * Component name used to create the component id.
   */
  name: PropTypes.string.isRequired,
  /**
   * List of objects which will be the base for the component options.
   */
  options: PropTypes.arrayOf(PropTypes.shape({
    /**
     * Option value, which will be returned in the select function.
     */
    value: PropTypes.string,
    /**
     * Option name shown in the options list.
     */
    name: PropTypes.string,
  })).isRequired,
  /**
   * Triggered when an option is selected.
   * @param {string} value
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Text which will be shown when none option is selected
   * (in the form variant the label may replace the placeholder)
   */
  placeholder: PropTypes.string,
  /**
   * Success message which adds success classes to the component.
   * The message stays under the value selector.
   */
  success: PropTypes.string,
  /**
   * Selected value. If it is not set, the placeholder will be shown.
   */
  value: PropTypes.string,
}

Dropdown.defaultProps = {
  theme: {},
  value: '',
  disabled: false,
  placeholder: '',
  error: '',
  success: '',
  label: '',
  icons: {},
}

export default Dropdown
