import React from 'react'
import classNames from 'classnames'
import {
  bool,
  node,
  shape,
  string,
} from 'prop-types'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIGrid')

const classnames = ({
  className,
  fullHeight,
  theme,
}) => classNames(
  theme.grid,
  className,
  {
    [theme.fullHeight]: fullHeight,
  }
)

/**
 * Grid structure with 4 break points and a variable number of columns.
 * Useful for organizing content in a page.
 */
const Grid = ({
  children,
  className,
  fullHeight,
  theme,
}) => (
  <div className={classnames({
    className,
    fullHeight,
    theme,
  })}
  >
    {children}
  </div>
)

Grid.propTypes = {
  /**
   * Sets of rows which will be rendered inside the grid.
   */
  children: node,
  /**
   * Custom CSS class which will be applied to the grid.
   */
  className: string,
  /**
   * The grid and their children will have the total height of its parent.
   */
  fullHeight: bool,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: shape({
    grid: string,
  }),
}

Grid.defaultProps = {
  children: null,
  className: null,
  fullHeight: false,
  theme: {},
}

export default consumeTheme(Grid)
