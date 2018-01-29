import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'

const applyThemr = themr('UIHeader')

const HeaderBackButton = ({
  icon,
  onClick,
  theme,
}) => (
  <button className={theme.backButton} onClick={onClick}>
    {icon}
  </button>
)

HeaderBackButton.propTypes = {
  theme: PropTypes.shape({
    backButton: PropTypes.string,
  }),
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
}

HeaderBackButton.defaultProps = {
  theme: {},
}

export default applyThemr(HeaderBackButton)
