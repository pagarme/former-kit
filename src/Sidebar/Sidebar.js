import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UISidebar')

const Sidebar = ({
  children,
  theme,
}) => (
  <aside
    className={classNames(theme.sidebar, theme.expanded)}
  >
    {children}
  </aside>
)

Sidebar.propTypes = {
  /**
   * The children can be any kind of component. However,
   * it's recommended to use `SidebarHeader`, `SidebarContent` or
   * `SidebarLinks` as direct children.
   */
  children: PropTypes.node.isRequired,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    /**
     * The class that will be used when the sidebar is collapsed.
     */
    collapsed: PropTypes.string,
    /**
     * The class that will be used when the sidebar is expanded.
     */
    expanded: PropTypes.string,
    /**
     * The main class used to stylize the component.
     */
    sidebar: PropTypes.string,
  }),
}

Sidebar.defaultProps = {
  theme: {},
}

export default consumeTheme(Sidebar)
