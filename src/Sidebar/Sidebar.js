import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UISidebar')

const Sidebar = ({ theme, collapsed, children }) => (
  <aside
    className={classNames(theme.sidebar, {
      [theme.collapsed]: collapsed,
    })}
  >
    {children}
  </aside>
)

Sidebar.propTypes = {
  theme: PropTypes.shape({
    sidebar: PropTypes.string,
    collapsed: PropTypes.string,
  }),
  collapsed: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

Sidebar.defaultProps = {
  theme: {},
  collapsed: false,
}

export default consumeTheme(Sidebar)
