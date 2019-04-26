import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UICard')
/**
 * This component is a block session that receives
 * a soft highlight compared to the rest of the page.
 */
const Card = ({
  children,
  className,
  theme,
}) => {
  const cardClasses = classNames(
    theme.card,
    className
  )
  return (
    <div className={cardClasses}>
      {children}
    </div>
  )
}

Card.propTypes = {
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
    card: PropTypes.string,
  }),
}

Card.defaultProps = {
  className: null,
  theme: {},
}

export default consumeTheme(Card)
