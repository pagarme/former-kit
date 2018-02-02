import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIFooter')

/**
 * The footer is shown at the bottom of the page. It displays
 * links to other pages.
*/
const Footer = ({ theme, children, links }) => (
  <footer className={theme.footer}>
    <nav className={theme.links}>
      {links.map(link => (
        <button
          key={link.title}
          onClick={link.onClick}
          title={link.title}
          role="link"
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
   * @see [ThemeProvider](#themeprovider) - Theme received from consumeTheme wrapper.
   */
  theme: PropTypes.shape({
    footer: PropTypes.string,
  }),
  /**
   * The footer navigation links. It should contain an array with the links titles and events.
   */
  links: PropTypes.arrayOf(PropTypes.shape({
    /**
     * The visible navigation link title.
    */
    title: PropTypes.string,
    /**
     * The navigation link event.
    */
    onClick: PropTypes.func,
  })).isRequired,
  /**
   * The component children. It should contain a React element.
  */
  children: PropTypes.node.isRequired,
}

Footer.defaultProps = {
  theme: {},
}

export default consumeTheme(Footer)
