import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UISidebar')

const SidebarHeader = ({ theme, children }) => (
  <header className={theme.header}>
    {children}
  </header>
)

SidebarHeader.propTypes = {
  theme: PropTypes.shape({
    header: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
}

SidebarHeader.defaultProps = {
  theme: {},
}

export default consumeTheme(SidebarHeader)
