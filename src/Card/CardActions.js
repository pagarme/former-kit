import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { themr } from 'react-css-themr'

const applyThemr = themr('UICard')

const CardActions = ({ className, children, theme }) => (
  <div className={classNames(className, theme.actions)}>
    {children}
  </div>
)

CardActions.propTypes = {
  theme: PropTypes.shape({
    base: PropTypes.string,
    actions: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

CardActions.defaultProps = {
  theme: {},
  className: null,
}

export default applyThemr(CardActions)
