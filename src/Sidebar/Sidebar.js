import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UISidebar')

const Sidebar = ({
  theme,
  collapsed,
  children,
}) => (
  <aside
    className={classNames(theme.sidebar, {
      [theme.collapsed]: collapsed,
    })}
  >
    {children}
  </aside>
)

Sidebar.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from consumeTheme wrapper.
   */
  theme: PropTypes.shape({
    /**
     * The main class used to stylize the component.
     */
    sidebar: PropTypes.string,
    /**
     * The class that will be used when the sidebar is collapsed.
     */
    collapsed: PropTypes.string,
  }),
  /**
   * Indicates if the sidebar is collapsed or not.
   */
  collapsed: PropTypes.bool,
  /**
   * The children can be any kind of component. However,
   * it's recommended to use SidebarHeader, SidebarContent or
   * SidebarLinks as direct children.
   */
  children: PropTypes.node.isRequired,
}

Sidebar.defaultProps = {
  theme: {},
  collapsed: false,
}

export default consumeTheme(Sidebar)
