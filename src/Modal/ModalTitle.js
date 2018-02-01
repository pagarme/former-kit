import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIModal')

/**
 * Modal component title. It renders its children at the top of the Modal.
 */
const ModalTitle = ({ theme, title, icon }) => (
  <div className={theme.title}>
    <div className={theme.icon}>{icon}</div>
    <h2>{title}</h2>
  </div>
)

ModalTitle.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from consumeTheme wrapper.
   */
  theme: PropTypes.shape({
    title: PropTypes.string,
    icon: PropTypes.string,
  }),
  /**
   * Text which will be shown at the top of the Modal.
   */
  title: PropTypes.string.isRequired,
  /**
   * Custom icon which stays at the left side of the title.
   */
  icon: PropTypes.element,
}

ModalTitle.defaultProps = {
  icon: null,
  theme: {},
}

export default consumeTheme(ModalTitle)
