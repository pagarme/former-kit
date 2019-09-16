import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIFooter')

/**
 * The footer is shown at the bottom of the page. It displays
 * links to other pages.
*/
const Footer = ({ children, links, theme }) => (
  <footer className={theme.footer}>
    <nav className={theme.links}>
      {links.map(link => (
        <button
          key={link.title}
          onClick={link.onClick}
          role="link"
          title={link.title}
          type="button"
        >
          {link.title}
        </button>
      ))}
    </nav>

    <nav className={theme.buttons}>
      {children}
    </nav>
  </footer>
)

Footer.propTypes = {
  /**
   * The component children. It should contain a React element.
  */
  children: PropTypes.node.isRequired,
  /**
   * The footer navigation links. It should contain an array with the links titles and events.
   */
  links: PropTypes.arrayOf(PropTypes.shape({
    /**
     * The navigation link event.
    */
    onClick: PropTypes.func,
    /**
     * The visible navigation link title.
    */
    title: PropTypes.string,
  })).isRequired,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    buttons: PropTypes.string,
    footer: PropTypes.string,
    links: PropTypes.string,
  }),
}

Footer.defaultProps = {
  theme: {},
}

export default consumeTheme(Footer)
