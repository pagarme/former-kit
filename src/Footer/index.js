import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'

const applyThemr = themr('UIFooter')

const Footer = ({ theme, children, links }) => (
  <footer className={theme.footer}>
    <nav>
      {links.map(link => (
        <a
          key={link.title}
          onClick={link.onClick}
          title={link.title}
          role="link"
          tabIndex="0"
        >
          {link.title}
        </a>
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

export default applyThemr(Footer)
