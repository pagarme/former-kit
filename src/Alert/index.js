import React from 'react'
import classNames from 'classnames'
import { isNil } from 'ramda'
import {
  oneOf,
  element,
  shape,
  string,
} from 'prop-types'
import { themr } from 'react-css-themr'

const applyThemr = themr('UIAlert')

function Alert ({
  children,
  base,
  icon,
  theme,
  type,
}) {
  const iconClassName = classNames(
    theme.icon,
    theme[base],
    theme[type]
  )

  return (
    <div className={theme.alert}>
      {!isNil(icon) && (
        <div className={iconClassName}>
          {icon}
        </div>
      )}
      <div className={theme.content}>
        {children}
      </div>
    </div>
  )
}

Alert.propTypes = {
  theme: shape({
    alert: string,
    icon: string,
    content: string,
    light: string,
    dark: string,
    warning: string,
    info: string,
    error: string,
    success: string,
  }),
  icon: element,
  type: oneOf([
    'warning',
    'info',
    'error',
    'success',
  ]).isRequired,
  children: element.isRequired,
  base: oneOf([
    'dark',
    'light',
  ]),
}

Alert.defaultProps = {
  icon: null,
  base: 'light',
  theme: {},
}

export default applyThemr(Alert)
