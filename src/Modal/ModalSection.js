import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIModal')

/**
 * Component that organizes its children in the middle of the Modal component.
 */
const ModalContent = ({ theme, children }) => (
  <div className={theme.section}>
    {children}
  </div>
)

ModalContent.propTypes = {
  /**
   * Set of React elements which will be rendered inside the component.
   */
  children: PropTypes.node.isRequired,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    section: PropTypes.string,
  }),
}

ModalContent.defaultProps = {
  theme: {},
}

export default consumeTheme(ModalContent)
