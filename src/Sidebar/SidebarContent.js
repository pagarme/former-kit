import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UISidebar')

const SidebarContent = ({ children, className, theme }) => (
  <div className={classNames(theme.content, className)}>
    {children}
  </div>
)

SidebarContent.propTypes = {
  /**
   * The children can contain any kind of component.
   */
  children: PropTypes.node.isRequired,
  /**
   * Custom CSS class.
   */
  className: PropTypes.string,
  /**
   * The style classes for this element.
   */
  theme: PropTypes.shape({
    /**
     * The main class used to stylize the component.
     */
    content: PropTypes.string,
  }),
}

SidebarContent.defaultProps = {
  className: null,
  theme: {},
}

export default consumeTheme(SidebarContent)
