import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIFooter')

const Footer = ({ theme, children, links }) => (
  <footer className={theme.footer}>
    <nav>
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

    <nav>
      {children}
    </nav>
  </footer>
)

Footer.propTypes = {
  theme: PropTypes.shape({
    footer: PropTypes.string,
  }),
  links: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    onClick: PropTypes.func,
  })).isRequired,
  children: PropTypes.node.isRequired,
}

Footer.defaultProps = {
  theme: {},
}

export default consumeTheme(Footer)
