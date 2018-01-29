import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import {
  ifElse,
  is,
  always,
  merge,
} from 'ramda'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UICard')

export const CardTitle = ({
  title,
  icon,
  className,
  children,
  onClick,
  theme,
}) => {
  const cardTitleClasses = classNames(
    className,
    theme.title
  )

  const defaultProps = {
    className: cardTitleClasses,
  }

  const isInteractiveProps = {
    role: 'button',
    tabIndex: '0',
    onClick,
    onKeyUp: event => event.keyCode === 32 && onClick(),
  }

  const getProps = ifElse(
    is(Function),
    () => merge(defaultProps, isInteractiveProps),
    always(defaultProps)
  )

  return (
    <div {...getProps(onClick)}>
      {icon &&
        <i className={theme.icon}>
          {icon}
        </i>
      }
      <h3>{title}</h3>
      {children}
    </div>
  )
}

CardTitle.propTypes = {
  theme: PropTypes.shape({
    title: PropTypes.string,
    icon: PropTypes.string,
  }),
  title: PropTypes.string.isRequired,
  icon: PropTypes.element,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
}

CardTitle.defaultProps = {
  theme: {},
  icon: null,
  className: null,
  children: null,
  onClick: null,
}

export default consumeTheme(CardTitle)
