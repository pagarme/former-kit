import React from 'react'
import classNames from 'classnames'
import { isNil } from 'ramda'
import {
  oneOf,
  element,
  shape,
  string,
  func,
} from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'
import Button from '../Button'

const consumeTheme = ThemeConsumer('UIAlert')

/**
 * The Alert component is used to create alerts of all kinds, such as `errors`, `warnings`, etc.
 */
const Alert = ({
  action,
  children,
  icon,
  onDismiss,
  theme,
  type,
}) => (
  <div className={theme.alert}>
    {!isNil(icon) && (
      <div className={classNames(theme.icon, theme[type])}>
        {icon}
      </div>
    )}
    <div
      aria-live="polite"
      className={theme.content}
      role="status"
    >
      {children}
      {(!isNil(action) && !isNil(onDismiss)) && (
        <Button
          fill="clean"
          onClick={onDismiss}
        >
          {action}
        </Button>
      )}
    </div>
  </div>
)

Alert.propTypes = {
  /**
   * The action text.
   */
  action: string,
  /**
   * The children element. It should contain a React element.
   */
  children: element.isRequired,
  /**
   * The alert icon. It must contain a React element.
   */
  icon: element,
  /**
   * The action callback.
   */
  onDismiss: func,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: shape({
    alert: string,
    icon: string,
    content: string,
    warning: string,
    info: string,
    error: string,
    success: string,
  }),
  /**
   * The types the alert can have. The background color
   * of the icon box changes based on the class related to the defined type.
   */
  type: oneOf([
    'error',
    'info',
    'success',
    'warning',
  ]).isRequired,
}

Alert.defaultProps = {
  action: null,
  icon: null,
  onDismiss: null,
  theme: {},
}

export default consumeTheme(Alert)
