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
  className,
  icon,
  onClick,
  subtitle,
  theme,
  title,
  titleSize,
}) => {
  const cardTitleClasses = classNames(
    className,
    theme.title
  )

  const defaultProps = {
    className: cardTitleClasses,
  }

  const isInteractiveProps = {
    onClick,
    onKeyUp: event => event.keyCode === 32 && onClick(),
    role: 'button',
    tabIndex: '0',
  }

  const getProps = ifElse(
    is(Function),
    () => merge(defaultProps, isInteractiveProps),
    always(defaultProps)
  )

  return (
    <div {...getProps(onClick)}>
      {
        (typeof title === 'string') && (
          <h2 className={theme[titleSize]}> {icon} {title} </h2>
        )
      }
      {
        (typeof title !== 'string') && title
      }
      {
        (typeof subtitle === 'string') && (
          <h3>{subtitle}</h3>
        )
      }
      {
        (typeof subtitle !== 'string') && subtitle
      }
    </div>
  )
}

CardTitle.propTypes = {
  /**
   * Custom class added to the component.
   */
  className: PropTypes.string,
  /**
   * The custom icon that is shown at the left side of the title.
   */
  icon: PropTypes.element,
  /**
   * Triggered when the title of the component is clicked.
   * @param {object} event - default HTML click event
   */
  onClick: PropTypes.func,
  /**
   * The secondary text of the component.
   */
  subtitle: PropTypes.node,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    default: PropTypes.string,
    icon: PropTypes.string,
    large: PropTypes.string,
    title: PropTypes.string,
  }),
  /**
   * The main text of the component.
   */
  title: PropTypes.node.isRequired,
  /**
   * The text size of the component.
   */
  titleSize: PropTypes.oneOf(['default', 'large']),
}

CardTitle.defaultProps = {
  className: null,
  icon: null,
  onClick: null,
  subtitle: '',
  theme: {},
  titleSize: 'default',
}

export default consumeTheme(CardTitle)
