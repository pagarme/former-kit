import React from 'react'
import PropTypes from 'prop-types'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UISidebar')

const SidebarLinks = ({ children, theme }) => (
  <nav>
    <ul className={theme.menu}>
      {children}
    </ul>
  </nav>
)

SidebarLinks.propTypes = {
  /**
   * The children can contain any kind of component.
   * However, it's recommended to have SidebarLink as
   * children.
   */
  children: PropTypes.node.isRequired,
  /**
   * The style classes for this element.
   */
  theme: PropTypes.shape({
    /**
     * The main class used to stylize the component.
     */
    menu: PropTypes.string,
  }),
}

SidebarLinks.defaultProps = {
  theme: {},
}

export default consumeTheme(SidebarLinks)
