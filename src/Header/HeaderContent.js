import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'

const applyThemr = themr('UIHeader')

const HeaderContent = ({
  children,
  theme,
}) => (
  <div className={theme.content}>
    {children}
  </div>
)

HeaderContent.propTypes = {
  theme: PropTypes.shape({
    content: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
}

HeaderContent.defaultProps = {
  theme: {},
}

export default applyThemr(HeaderContent)
