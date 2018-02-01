import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UICard')
/**
 * Actions which will be used in the card.
 */
const CardActions = ({ className, children, theme }) => (
  <div className={classNames(className, theme.actions)}>
    {children}
  </div>
)

CardActions.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from consumeTheme wrapper.
   */
  theme: PropTypes.shape({
    base: PropTypes.string,
    actions: PropTypes.string,
  }),
  /**
   * Set of react elements which will be rendered inside the card actions.
   * These elements should contain actions.
   */
  children: PropTypes.node.isRequired,
  /**
   * Custom css class.
   */
  className: PropTypes.string,
}

CardActions.defaultProps = {
  theme: {},
  className: null,
}

export default consumeTheme(CardActions)
