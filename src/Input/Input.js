import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import shortid from 'shortid'
import MaskedInput from 'react-maskedinput'
import {
  isEmpty,
  isNil,
  merge,
  omit,
  prop,
} from 'ramda'

const omitOwnProps = omit([
  'className',
  'error',
  'hint',
  'icon',
  'icons',
  'inputRef',
  'label',
  'mask',
  'multiline',
  'onBlur',
  'onChange',
  'onFocus',
  'theme',
  'type',
])

const validateMultiline = ({
  mask,
  multiline,
  type,
}, propName) => {
  if (
    propName === 'multiline' &&
    multiline &&
    type !== 'text' &&
    !isNil(type)
  ) {
    throw new Error('Multiline inputs must have the type "text"')
  }

  if (
    propName === 'multiline' &&
    multiline &&
    !isEmpty(mask)
  ) {
    throw new Error('Adding a mask to a multiline component is not possible, it was rendered without the mask.')
  }
}

/**
 * Custom Input component, which is the native HTML input on steroids.
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

  handleBlur (event) {
    this.setState({
      isFocused: false,
    })
    if (this.props.onBlur) {
      this.props.onBlur(event)
    }
  }

  handleFocus (event) {
    this.setState({
      isFocused: true,
    })
    if (this.props.onFocus) {
      this.props.onFocus(event)
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

    return (
      <button
        type="button"
        tabIndex="-1"
        className={theme.displayPasswordIcon}
        onClick={this.handlePasswordVisibilityChange}
      >
        {this.state.showPassword
          ? icons.hidePassword
          : icons.showPassword
        }
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
      mask,
      multiline,
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
        [theme.active]: !disabled && !isNil(value) && value !== '',
        [theme.focused]: this.state.isFocused,
        [theme.disabled]: disabled,
        [theme.error]: error,
      }
    )

    const contentPresent = classnames({
      [theme.contentPresent]: !isNil(value) && value !== '',
    })

    const inputProps = merge(
      omitOwnProps(this.props),
      {
        ref: prop('inputRef', this.props),
      }
    )

    const inputType = (type === 'password' && this.state.showPassword)
      || multiline
      ? 'text'
      : type

    const hasSecondaryText = theme.secondaryText && (hint || error)

    const hasLabel = theme.contentPresent && label

    return (
      <div className={root}>
        {icon &&
          <div className={theme.icon}>{icon}</div>
        }
        <div className={theme.boxContainer}>
          <div className={container}>
            {multiline && (
              <textarea
                rows="1"
                onChange={disabled ? null : onChange}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
                {...inputProps}
              />
            )}

            {!multiline && (mask ?
              (
                <MaskedInput
                  mask={mask}
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
            )}

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
              {error || hint}
            </p>
          }
        </div>
      </div>
    )
  }
}

Input.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    active: PropTypes.string,
    boxContainer: PropTypes.string,
    container: PropTypes.string,
    contentPresent: PropTypes.string,
    error: PropTypes.string,
    expander: PropTypes.string,
    focused: PropTypes.string,
    icon: PropTypes.string,
    input: PropTypes.string,
    multiline: PropTypes.string,
    secondaryText: PropTypes.string,
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
   * Default icons used to tell the user if the password is being shown or not.
   */
  icons: PropTypes.shape({
    showPassword: PropTypes.element,
    hidePassword: PropTypes.element,
  }),
  /**
   * Associated with `ref` prop from React.
   * See https://reactjs.org/docs/refs-and-the-dom.html for more info on usage.
   */
  inputRef: PropTypes.func,
  /**
   * Input's label, used as a placeholder until the input receives focus.
   * When the input is focused, the label stays above the input.
   */
  label: PropTypes.string,
  /**
   * Apply a mask to the input.
   * Go to https://github.com/insin/inputmask-core#pattern to check formatting styles
   */
  mask: PropTypes.string,
  /**
   * Allow multiline texts if the component type is text.
   */
  multiline: validateMultiline,
  /**
   * Input's name.
   */
  name: PropTypes.string,
  /**
   * Triggered by the input's blur event.
   */
  onBlur: PropTypes.func,
  /**
   * The onChange callback is triggered when the value of the input changes.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Triggered by the input's focus event.
   */
  onFocus: PropTypes.func,
  /**
   * Use onKeyPress to handle key events on the input, such as _Enter_ pressed.
   */
  onKeyPress: PropTypes.func,
  /**
   * Input's placeholder.
   */
  placeholder: PropTypes.string,
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
}

Input.defaultProps = {
  className: '',
  disabled: false,
  error: '',
  hint: '',
  icon: null,
  icons: {},
  inputRef: null,
  label: '',
  mask: '',
  multiline: false,
  name: '',
  onBlur: null,
  onFocus: null,
  onKeyPress: null,
  placeholder: '',
  theme: {},
  type: 'text',
}

export default Input
