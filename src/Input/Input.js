import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import shortid from 'shortid'
import { isNil, pick } from 'ramda'

const validateMultiline = (props, propName) => {
  const { multiline, type } = props
  if (
    propName === 'multiline' &&
    multiline &&
    type !== 'text' &&
    !isNil(type)
  ) {
    throw new Error('Multiline inputs must have the type "text"')
  }
}

/**
 * Custom Input component, which is the native html 'input' on steroids.
 * It also has an awesome skin and a multiline version.
 */
class Input extends React.PureComponent {
  constructor (props) {
    super(props)

    this.instanceId = `${props.name}-${shortid.generate()}`
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handlePasswordVisibilityChange = this.handlePasswordVisibilityChange.bind(this)
    this.state = {
      showPassword: false,
      isFocused: false,
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

  handlePasswordVisibilityChange (event) {
    event.preventDefault()
    this.setState({
      showPassword: !(this.state.showPassword),
    })
  }
  renderPasswordVisibilityIcon () {
    const {
      value,
      type,
      theme,
      icons,
      disabled,
    } = this.props

    if (disabled || value === '' || type !== 'password') {
      return null
    }

    if (this.state.showPassword) {
      return (
        <button
          className={theme.displayPasswordIcon}
          onClick={this.handlePasswordVisibilityChange}
        >
          {icons.hidePassword}
        </button>
      )
    }

    return (
      <button
        className={theme.displayPasswordIcon}
        onClick={this.handlePasswordVisibilityChange}
      >
        {icons.showPassword}
      </button>
    )
  }

  render () {
    const {
      disabled,
      error,
      hint,
      icon,
      label,
      multiline,
      success,
      type,
      value,
      className,
      onChange,
      theme,
    } = this.props

    const container = classnames(theme.container, {
      [theme.multiline]: multiline,
    })

    const root = classnames(
      className,
      theme.input,
      {
        [theme.active]: !disabled && value !== '',
        [theme.focused]: this.state.isFocused,
        [theme.disabled]: disabled,
        [theme.error]: error,
        [theme.success]: success,
      }
    )

    const contentPresent = classnames({
      [theme.contentPresent]: value !== '',
    })

    const inputProps = pick(
      ['disabled', 'placeholder', 'value', 'name'],
      this.props
    )

    const inputType = (type === 'password' && this.state.showPassword)
      || multiline
      ? 'text'
      : type

    const hasSecondaryText = theme.secondaryText && (hint || error || success)

    const hasLabel = theme.contentPresent && label

    return (
      <div className={root}>
        {icon &&
          <div className={theme.icon}>{icon}</div>
        }
        <div className={theme.boxContainer}>
          <div className={container}>
            {multiline
              ? (
                <textarea
                  rows="1"
                  onChange={disabled ? null : onChange}
                  onBlur={this.handleBlur}
                  onFocus={this.handleFocus}
                  {...inputProps}
                />
              ) : (
                <input
                  id={this.instanceId}
                  type={inputType}
                  onChange={disabled ? null : onChange}
                  onBlur={this.handleBlur}
                  onFocus={this.handleFocus}
                  {...inputProps}
                />
              )
            }

            {this.renderPasswordVisibilityIcon()}
            {hasLabel &&
              <label
                htmlFor={this.instanceId}
                className={contentPresent}
              >
                {label}
              </label>
            }
            {multiline &&
              <div className={theme.expander}>
                {value}
                <br />
              </div>
            }
          </div>
          {hasSecondaryText &&
            <p className={theme.secondaryText}>
              {success || error || hint}
            </p>
          }
        </div>
      </div>
    )
  }
}

Input.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from consumeTheme wrapper.
   */
  theme: PropTypes.shape({
    input: PropTypes.string,
    icon: PropTypes.string,
    boxContainer: PropTypes.string,
    container: PropTypes.string,
    secondaryText: PropTypes.string,
    active: PropTypes.string,
    focused: PropTypes.string,
    error: PropTypes.string,
    multiline: PropTypes.string,
    expander: PropTypes.string,
    contentPresent: PropTypes.string,
  }),
  /**
   * Aditional CSS classes which can be applied to the input.
   */
  className: PropTypes.string,
  /**
   * The prop that disables the component.
   */
  disabled: PropTypes.bool,
  /**
   * Error message which indicates an error and adds error classes.
   */
  error: PropTypes.string,
  /**
   * Hint text which stays below the input.
   */
  hint: PropTypes.string,
  /**
   * The custom icon which stays at the left side of the input.
   */
  icon: PropTypes.element,
  /**
   * Input's label, used as a placeholder until the input receives focus.
   * When the input is focused, the label stays above the input.
   */
  label: PropTypes.string,
  /**
   * Allow multiline texts if the component type is text.
   */
  multiline: validateMultiline,
  /**
   * Input's name.
   */
  name: PropTypes.string,
  /**
   * The onChange callback is triggered when the value of the input changes.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Default icons used to tell the user if the password is being shown or not.
   */
  icons: PropTypes.shape({
    showPassword: PropTypes.element,
    hidePassword: PropTypes.element,
  }),
  /**
   * Input's placeholder.
   */
  placeholder: PropTypes.string,
  /**
   * Success message which indicates success and adds success classes.
   */
  success: PropTypes.string,
  /**
   * Input's type.
   */
  type: PropTypes.oneOf([
    'text',
    'password',
    'number',
    'email',
    'phone',
  ]),
  /**
   * Input's value.
   */
  value: PropTypes.string.isRequired,
  /**
   * Triggered by the input's blur event.
   */
  onBlur: PropTypes.func,
  /**
   * Triggered by the input's focus event.
   */
  onFocus: PropTypes.func,
}

Input.defaultProps = {
  className: '',
  disabled: false,
  error: '',
  hint: '',
  icon: null,
  label: '',
  multiline: false,
  name: '',
  icons: {},
  placeholder: '',
  success: '',
  theme: {},
  type: 'text',
  onBlur: null,
  onFocus: null,
}

export default Input
