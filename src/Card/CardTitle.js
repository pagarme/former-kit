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
 * The title for cards. The component should be added inside a card.
 */
export const CardTitle = ({
  title,
  subtitle,
  icon,
  className,
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
      {
        (typeof title === 'string') &&
          <h2>
            {icon}
            {title}
          </h2>
      }
      {
        (typeof title !== 'string') &&
          title
      }
      {
        (typeof subtitle === 'string') &&
          <h3>{subtitle}</h3>
      }
      {
        (typeof subtitle !== 'string') &&
          subtitle
      }
    </div>
  )
}

CardTitle.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    title: PropTypes.string,
    icon: PropTypes.string,
  }),
  /**
   * The main text of the component.
   */
  title: PropTypes.node.isRequired,
  /**
   * The secondary text of the component.
   */
  subtitle: PropTypes.node,
  /**
   * The custom icon that is shown at the left side of the title.
   */
  icon: PropTypes.element,
  /**
   * Custom class added to the component.
   */
  className: PropTypes.string,
  /**
   * Triggered when the title of the component is clicked.
   * @param {object} event - default HTML click event
   */
  onClick: PropTypes.func,
}

CardTitle.defaultProps = {
  theme: {},
  icon: null,
  className: null,
  onClick: null,
  subtitle: '',
}

export default consumeTheme(CardTitle)
