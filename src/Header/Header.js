import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIHeader')

/**
 * Simple and elegant page header.
 * Receives React component as children and gracefully shows
 * them in the top of the page.
 */
const Header = ({ children, theme }) => (
  <header className={theme.header}>
    {children}
  </header>
)

Header.propTypes = {
  /**
   * The children can contain any kind of element.
   * However, it's recommended to have `HeaderTitle` and
   * `HeaderContent` as direct children.
   */
  children: PropTypes.node.isRequired,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    /**
     * The main class to style this element.
     */
    header: PropTypes.string,
  }),
}

Header.defaultProps = {
  theme: {},
}

export default consumeTheme(Header)
