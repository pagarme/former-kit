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

/**
 * Title for cards. The component should be added inside a card.
 */
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
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from consumeTheme wrapper.
   */
  theme: PropTypes.shape({
    title: PropTypes.string,
    icon: PropTypes.string,
  }),
  /**
   * Main text of the component.
   */
  title: PropTypes.string.isRequired,
  /**
   * Custom icon shown at the left side of the title.
   */
  icon: PropTypes.element,
  /**
   * Custom class added to the component.
   */
  className: PropTypes.string,
  /**
   * Set of react elements which will be rendered inside the title.
   */
  children: PropTypes.node,
  /**
   * Triggered when the title of the component is clicked.
   * @param {object} event - default html click event
   */
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
