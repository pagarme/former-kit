import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UICard')
/**
 * Content that is highlighted inside a card.
 */
const CardContent = ({
  children,
  className,
  theme,
}) => {
  const cardContentClass = classNames(
    theme.content,
    className
  )
  return (
    <div className={cardContentClass}>
      {children}
    </div>
  )
}

CardContent.propTypes = {
  /**
   * Set of React elements which will be rendered inside the card.
   */
  children: PropTypes.node.isRequired,
  /**
   * Custom CSS class.
   */
  className: PropTypes.string,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    base: PropTypes.string,
    content: PropTypes.string,
  }),
}

CardContent.defaultProps = {
  className: null,
  theme: {},
}

export default consumeTheme(CardContent)
