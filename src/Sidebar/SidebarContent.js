import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'

const applyThemr = themr('UISidebar')

const SidebarContent = ({ theme, children }) => (
  <div className={theme.content}>
    {children}
  </div>
)

SidebarContent.propTypes = {
  theme: PropTypes.shape({
    content: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
}

SidebarContent.defaultProps = {
  theme: {},
}

export default applyThemr(SidebarContent)
