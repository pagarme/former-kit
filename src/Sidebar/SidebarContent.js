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
  /**
   * The style classes for this element.
   */
  theme: PropTypes.shape({
    /**
     * The main class used to stylize the component.
     */
    content: PropTypes.string,
  }),
  /**
   * The children can contain any kind of component.
   */
  children: PropTypes.node.isRequired,
}

SidebarContent.defaultProps = {
  theme: {},
}

export default consumeTheme(SidebarContent)
