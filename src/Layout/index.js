import React from 'react'
import PropTypes from 'prop-types'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UILayout')

/**
 * Provides an interface to create a simple layout, using
 * sidebar, header, footer and content.
 */
const Layout = ({
  theme,
  header,
  sidebar,
  footer,
  children,
}) => (
  <div className={theme.layout}>
    {sidebar}
    <div className={theme.wrapper}>
      {header}
      <div className={theme.content}>
        <main role="main" className={theme.children}>
          {children}
        </main>
        {footer}
      </div>
    </div>
  </div>
)

Layout.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    layout: PropTypes.string,
    content: PropTypes.string,
    children: PropTypes.string,
  }),
  /**
   * The Header component. Must be a React element.
   */
  header: PropTypes.element,
  /**
   * The Sidebar component. Must be a React element.
   */
  sidebar: PropTypes.element,
  /**
   * The Footer component. Must be a React element.
   */
  footer: PropTypes.element,
  /**
   * The content that can be scrolled.
   */
  children: PropTypes.node.isRequired,
}

Layout.defaultProps = {
  theme: {},
  header: null,
  sidebar: null,
  footer: null,
}

export default consumeTheme(Layout)
