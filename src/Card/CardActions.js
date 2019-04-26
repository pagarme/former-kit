import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UICard')
/**
 * Actions which will be used on the card.
 */
const CardActions = ({ children, className, theme }) => (
  <div className={classNames(className, theme.actions)}>
    {children}
  </div>
)

CardActions.propTypes = {
  /**
   * Set of React elements which will be rendered inside the card actions.
   * These elements should contain actions.
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
    actions: PropTypes.string,
    base: PropTypes.string,
  }),
}

CardActions.defaultProps = {
  className: null,
  theme: {},
}

export default consumeTheme(CardActions)
