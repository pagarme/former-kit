import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UICard')
/**
 * Content that is highlighted inside a card.
 */
const CardContent = ({
  className,
  children,
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
   * @see [ThemeProvider](#themeprovider) - Theme received from consumeTheme wrapper.
   */
  theme: PropTypes.shape({
    base: PropTypes.string,
    content: PropTypes.string,
  }),
  /**
   * Set of react elements which will be rendered inside the card.
   */
  children: PropTypes.node.isRequired,
  /**
   * Custom css class.
   */
  className: PropTypes.string,
}

CardContent.defaultProps = {
  theme: {},
  className: null,
}

export default consumeTheme(CardContent)
