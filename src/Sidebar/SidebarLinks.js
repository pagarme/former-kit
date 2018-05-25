import React from 'react'
import PropTypes from 'prop-types'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UISidebar')

const SidebarLinks = ({ theme, children }) => (
  <nav>
    <ul className={theme.menu}>
      {children}
    </ul>
  </nav>
)

SidebarLinks.propTypes = {
  /**
   * The style classes for this element.
   */
  theme: PropTypes.shape({
    /**
     * The main class used to stylize the component.
     */
    menu: PropTypes.string,
  }),
  /**
   * The children can contain any kind of component.
   * However, it's recommended to have SidebarLink as
   * children.
   */
  children: PropTypes.node.isRequired,
}

SidebarLinks.defaultProps = {
  theme: {},
}

export default consumeTheme(SidebarLinks)
