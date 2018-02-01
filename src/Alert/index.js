import React from 'react'
import classNames from 'classnames'
import { isNil } from 'ramda'
import {
  oneOf,
  element,
  shape,
  string,
} from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIAlert')

/**
 * The Alert component is used to create alerts of all kinds, such as "errors", "warnings", etc.
 */
const Alert = ({
  children,
  icon,
  theme,
  type,
}) => (
  <div className={theme.alert}>
    {!isNil(icon) && (
      <div className={classNames(theme.icon, theme[type])}>
        {icon}
      </div>
    )}
    <div className={theme.content}>
      {children}
    </div>
  </div>
)

Alert.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from consumeTheme wrapper.
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
   * The alert icon. It must contain a React element.
   */
  icon: element,
  /**
   * The types the alert can have. The background color
   * of the icon box changes based on the class related to the defined type.
   */
  type: oneOf([
    'warning',
    'info',
    'error',
    'success',
  ]).isRequired,
  /**
   * The children element. It should contain a React element.
   */
  children: element.isRequired,
}

Alert.defaultProps = {
  icon: null,
  theme: {},
}

export default consumeTheme(Alert)
