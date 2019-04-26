import React from 'react'
import PropTypes from 'prop-types'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UILayout')

/**
 * Provides an interface to create a simple layout, using
 * sidebar, header, footer and content.
 */
const Layout = ({
  children,
  footer,
  header,
  sidebar,
  theme,
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
   * The content that can be scrolled.
   */
  children: PropTypes.node.isRequired,
  /**
   * The Footer component. Must be a React element.
   */
  footer: PropTypes.element,
  /**
   * The Header component. Must be a React element.
   */
  header: PropTypes.element,
  /**
   * The Sidebar component. Must be a React element.
   */
  sidebar: PropTypes.element,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    children: PropTypes.string,
    content: PropTypes.string,
    layout: PropTypes.string,
  }),
}

Layout.defaultProps = {
  footer: null,
  header: null,
  sidebar: null,
  theme: {},
}

export default consumeTheme(Layout)
