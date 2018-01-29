import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'

const applyThemr = themr('UIHeader')

const Header = ({ theme, children }) => (
  <header className={theme.header}>
    {children}
  </header>
)

Header.propTypes = {
  theme: PropTypes.shape({
    header: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
}

Header.defaultProps = {
  theme: {},
}

export default applyThemr(Header)
