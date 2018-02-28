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

/**
 * Grid structure with 4 break points and a variable number of columns.
 * Useful for organizing content in a page.
 */
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
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: {},
  /**
   * Sets of rows which will be rendered inside the grid.
   */
  children: null,
  /**
   * Custom CSS class which will be applied to the grid.
   */
  className: null,
}

export default consumeTheme(Grid)
