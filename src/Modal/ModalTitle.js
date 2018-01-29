import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'

const applyThemr = themr('UIModal')

const ModalTitle = ({ theme, title, icon }) => (
  <div className={theme.title}>
    <div className={theme.icon}>{icon}</div>
    <h2>{title}</h2>
  </div>
)

ModalTitle.propTypes = {
  theme: PropTypes.shape({
    title: PropTypes.string,
    icon: PropTypes.string,
  }),
  title: PropTypes.string.isRequired,
  icon: PropTypes.element,
}

ModalTitle.defaultProps = {
  icon: null,
  theme: {},
}

export default applyThemr(ModalTitle)
