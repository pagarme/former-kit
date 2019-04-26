import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIModal')

/**
 * Set of React elements which stay in the modal bottom.
 */
const ModalActions = ({ children, theme }) => (
  <div className={theme.actions}>
    {children}
  </div>
)

ModalActions.propTypes = {
  /**
   * Set of React elements which will be rendered inside the component.
   */
  children: PropTypes.node.isRequired,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    actions: PropTypes.string,
  }),
}

ModalActions.defaultProps = {
  theme: {},
}

export default consumeTheme(ModalActions)
