import React from 'react'
import classNames from 'classnames'
import { themr } from 'react-css-themr'
import {
  shape,
  string,
  node,
} from 'prop-types'

const applyThemr = themr('UIGrid')

const classnames = ({ theme, className }) =>
  classNames(
    theme.grid,
    className
  )

const Grid = ({ theme, children, className }) => (
  <div className={classnames({ theme, className })}>
    {children}
  </div>
)

Grid.propTypes = {
  theme: shape({
    grid: string,
  }),
  children: node,
  className: string,
}

Grid.defaultProps = {
  theme: {},
  children: null,
  className: null,
}

export default applyThemr(Grid)
