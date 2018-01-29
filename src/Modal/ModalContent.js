import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIModal')

const ModalContent = ({ theme, children }) => (
  <div className={theme.content}>
    {children}
  </div>
)

ModalContent.propTypes = {
  theme: PropTypes.shape({
    content: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
}

ModalContent.defaultProps = {
  theme: {},
}

export default consumeTheme(ModalContent)
