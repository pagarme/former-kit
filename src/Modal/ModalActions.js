import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIModal')

const ModalActions = ({ theme, children }) => (
  <div className={theme.actions}>
    {children}
  </div>
)

ModalActions.propTypes = {
  theme: PropTypes.shape({
    actions: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
}

ModalActions.defaultProps = {
  theme: {},
}

export default consumeTheme(ModalActions)
