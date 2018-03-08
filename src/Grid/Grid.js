import React from 'react'
import classNames from 'classnames'
import {
  shape,
  string,
  node,
} from 'prop-types'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIGrid')

const classnames = ({
  theme,
  fullHeight,
  className,
}) =>
  classNames(
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
  theme,
  children,
  className,
  fullHeight,
}) => (
  <div className={classnames({
    theme,
    className,
    fullHeight,
    })}
  >
    {children}
  </div>
)

Grid.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: shape({
    grid: string,
  }),
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
  fullHeight: string,
}

Grid.defaultProps = {
  theme: {},
  fullHeight: false,
  children: null,
  className: null,
}

export default consumeTheme(Grid)
