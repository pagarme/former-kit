import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UISidebar')

const SidebarContent = ({ theme, children }) => (
  <div className={theme.content}>
    {children}
  </div>
)

SidebarContent.propTypes = {
  theme: PropTypes.shape({
    content: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
}

SidebarContent.defaultProps = {
  theme: {},
}

export default consumeTheme(SidebarContent)
