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
  /**
   * The style classes for this element.
   */
  theme: PropTypes.shape({
    /**
     * The main class used to style the component.
     */
    header: PropTypes.string,
  }),
  /**
   * The children can contain any kind of component.
   * It is recommended to have a logo and
   * a button to collapse or expand the Sidebar.
   */
  children: PropTypes.node.isRequired,
}

SidebarHeader.defaultProps = {
  theme: {},
}

export default consumeTheme(SidebarHeader)
