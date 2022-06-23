import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import shortid from 'shortid'
import MaskedInput from 'react-input-mask'
import {
  dissoc,
  isEmpty,
  isNil,
  merge,
  omit,
  prop,
} from 'ramda'

const omitOwnProps = omit([
  'base',
  'className',
  'error',
  'hint',
  'icon',
  'icons',
  'inputRef',
  'label',
  'mask',
  'maskChar',
  'multiline',
  'onBlur',
  'onChange',
  'onFocus',
  'renderer',
  'theme',
  'type',
])

const validateMultiline = ({
  mask,
  multiline,
  renderer,
  type,
}, propName) => {
  if (
    propName === 'multiline'
    && multiline
    && type !== 'text'
    && !isNil(type)
  ) {
    throw new Error('Multiline inputs must have the type "text"')
  }

  if (
    propName === 'multiline'
    && multiline
    && !isEmpty(mask)
  ) {
    throw new Error('Adding a mask to a multiline component is not possible, it was rendered without the mask.')
  }

  if (
    propName === 'multiline'
    && multiline
    && !isNil(renderer)
  ) {
    throw new Error('Adding renderer to a multiline component is not possible, it was rendered as a multiline input.')
  }
}

const getInputType = (type, showPassword, multiline) => {
  if ((type === 'password' && showPassword) || multiline) {
    return 'text'
  }

  if (type === 'phone') {
    return 'tel'
  }

  return type
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
    this.handlePasswordVisibilityChange = this
      .handlePasswordVisibilityChange.bind(this)
    this.state = {
      isFocused: false,
      showPassword: false,
    }
  }

  handleBlur (event) {
    const { onBlur } = this.props
    this.setState({
      isFocused: false,
    })
    if (onBlur) {
      onBlur(event)
    }
  }

  handleFocus (event) {
    const { onFocus } = this.props
    this.setState({
      isFocused: true,
    })
    if (onFocus) {
      onFocus(event)
    }
  }

  handlePasswordVisibilityChange (event) {
    const { showPassword } = this.state
    event.preventDefault()
    this.setState({
      showPassword: !showPassword,
    })
  }

  renderInput (receivedProps) {
    const {
      disabled,
      mask,
      maskChar,
      multiline,
      onChange,
      renderer,
      type,
    } = this.props
    const { showPassword } = this.state
    const inputType = getInputType(type, showPassword, multiline)

    if (!isNil(renderer)) {
      return renderer(dissoc('renderer', this.props))
    }

    const inputProps = {
      ...receivedProps,
      type: inputType,
    }

    if (mask) {
      return (
        <MaskedInput
          formatChars={{
            1: '[0-9]',
          }}
          mask={mask}
          maskChar={maskChar}
          onChange={disabled ? null : onChange}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          {...inputProps}
        />
      )
    }

    return (
      <input
        id={this.instanceId}
        onChange={disabled ? null : onChange}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        {...inputProps}
      />
    )
  }

  renderPasswordVisibilityIcon () {
    const {
      disabled,
      icons,
      theme,
      type,
      value,
    } = this.props
    const { showPassword } = this.state
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
        {showPassword
          ? icons.hidePassword
          : icons.showPassword
        }
      </button>
    )
  }

  render () {
    const {
      base,
      className,
      'data-test': dataTestId,
      disabled,
      error,
      hint,
      icon,
      label,
      multiline,
      onChange,
      size,
      theme,
      value,
    } = this.props
    const { isFocused } = this.state
    const container = classnames(theme.container, {
      [theme.multiline]: multiline,
    })

    const root = classnames(
      className,
      theme.input,
      theme[base],
      {
        [theme.active]: !disabled && !isNil(value) && value !== '',
        [theme.focused]: isFocused,
        [theme.disabled]: disabled,
        [theme.error]: error,
        [theme[size]]: size,
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

    const hasSecondaryText = theme.secondaryText && (hint || error)

    const hasLabel = theme.contentPresent && label

    return (
      <div className={root}>
        {icon && <div className={theme.icon}>{icon}</div>}
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
            {!multiline && this.renderInput(inputProps)}
            {this.renderPasswordVisibilityIcon()}
            {hasLabel && (
              <label
                htmlFor={this.instanceId}
                className={contentPresent}
              >
                {label}
              </label>
            )}
            {multiline && (
              <div className={theme.expander}>
                {value}
                <br />
              </div>
            )}
          </div>
          {hasSecondaryText && (
            <p className={theme.secondaryText} data-test={dataTestId}>
              {error || hint}
            </p>
          )}
        </div>
      </div>
    )
  }
}

Input.propTypes = {
  base: PropTypes.oneOf([
    'dark',
    'light',
  ]),
  /**
   * Aditional CSS classes which can be applied to the input.
   */
  className: PropTypes.string,
  /**
   * Test selectors
   */
  'data-test': PropTypes.string,
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
    hidePassword: PropTypes.element,
    showPassword: PropTypes.element,
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
   * This prop is prioritized over the render options mask and renderer
   */
  maskChar: PropTypes.string,
  /**
   * Character to cover unfilled parts of the mask. Default character is "_".
   * If set to null or empty string, unfilled parts will be empty as in ordinary input.
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
   * Render function which will receive this component props and must return a
   * input to be used inside this component
   */
  renderer: PropTypes.func,
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
    active: PropTypes.string,
    boxContainer: PropTypes.string,
    container: PropTypes.string,
    contentPresent: PropTypes.string,
    dark: PropTypes.string,
    disabled: PropTypes.string,
    displayPasswordIcon: PropTypes.string,
    error: PropTypes.string,
    expander: PropTypes.string,
    focused: PropTypes.string,
    icon: PropTypes.string,
    input: PropTypes.string,
    light: PropTypes.string,
    multiline: PropTypes.string,
    secondaryText: PropTypes.string,
    size: PropTypes.string,
  }),
  /**
   * Input's type.
   */
  type: PropTypes.oneOf([
    'text',
    'password',
    'number',
    'email',
    'phone',
    'tel',
  ]),
  /**
   * Input's value.
   */
  value: PropTypes.string,
}

Input.defaultProps = {
  base: 'light',
  className: '',
  'data-test': null,
  disabled: false,
  error: '',
  hint: '',
  icon: null,
  icons: {},
  inputRef: null,
  label: '',
  mask: '',
  maskChar: '_',
  multiline: false,
  name: '',
  onBlur: null,
  onFocus: null,
  onKeyPress: null,
  placeholder: '',
  renderer: null,
  size: null,
  theme: {},
  type: 'text',
  value: '',
}

export default Input
