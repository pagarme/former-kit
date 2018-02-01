import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIModal')

/**
 * Set of react elements which stay in the modal bottom.
 */
const ModalActions = ({ theme, children }) => (
  <div className={theme.actions}>
    {children}
  </div>
)

ModalActions.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from consumeTheme wrapper.
   */
  theme: PropTypes.shape({
    actions: PropTypes.string,
  }),
  /**
   * Set of react elements which will be rendered inside the component.
   */
  children: PropTypes.node.isRequired,
}

ModalActions.defaultProps = {
  theme: {},
}

export default consumeTheme(ModalActions)
