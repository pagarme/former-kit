import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import shortid from 'shortid'

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
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.state = {
      isFocused: false,
    }
  }

  handleChange (event) {
    const { disabled, onChange } = this.props

    if (!disabled) {
      onChange(event)
    }
  }

  handleBlur () {
    this.setState({
      isFocused: false,
    })
    if (this.props.onBlur) {
      this.props.onBlur()
    }
  }

  handleFocus () {
    this.setState({
      isFocused: true,
    })
    if (this.props.onFocus) {
      this.props.onFocus()
    }
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
      size,
      theme,
      value,
    } = this.props

    const rootClasses = classNames(
      theme.dropdown,
      {
        [theme.disabled]: disabled,
        [theme.error]: error,
        [theme.focused]: this.state.isFocused,
        [theme[size]]: size,
      }
    )

    const hasSecondaryText = theme.secondaryText && (error)
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
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          disabled={disabled}
          value={value || 'placeholder'}
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
            {error}
          </p>
        }
      </div>
    )
  }
}

Dropdown.propTypes = {
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
   * Triggered by the dropdown's blur event.
   */
  onBlur: PropTypes.func,
  /**
   * Triggered when an option is selected.
   * @param {object} event
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Triggered by the dropdown's focus event.
   */
  onFocus: PropTypes.func,
  /**
   * List of objects which will be the base for the component options.
   */
  options: PropTypes.arrayOf(PropTypes.shape({
    /**
     * Option name shown in the options list.
     */
    name: PropTypes.string,
    /**
     * Option value, which will be returned in the select function.
     */
    value: PropTypes.string,
  })).isRequired,
  /**
   * Text which will be shown when none option is selected
   * (in the form variant the label may replace the placeholder).
   */
  placeholder: PropTypes.string,
  /**
   * Component's size.
   */
  size: PropTypes.oneOf([
    'tiny',
  ]),
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    arrow: PropTypes.string,
    disabled: PropTypes.string,
    dropdown: PropTypes.string,
    error: PropTypes.string,
    focused: PropTypes.string,
    placeholder: PropTypes.string,
    secondaryText: PropTypes.string,
    select: PropTypes.string,
    tiny: PropTypes.string,
  }),
  /**
   * Selected value. If it's not set, the placeholder will be shown.
   */
  value: PropTypes.string,
}

Dropdown.defaultProps = {
  disabled: false,
  error: '',
  icons: {},
  label: '',
  onBlur: null,
  onFocus: null,
  placeholder: '',
  size: null,
  theme: {},
  value: '',
}

export default Dropdown
