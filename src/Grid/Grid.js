import React from 'react'
import classNames from 'classnames'
import {
  shape,
  string,
  node,
} from 'prop-types'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIGrid')

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

export default consumeTheme(Grid)
