import React from 'react'
import classNames from 'classnames'
import {
  shape,
  string,
  node,
  number,
  bool,
} from 'prop-types'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIGrid')

/**
 * Columns structure used inside the Row component.
 */
const classnames = ({
  theme,
  className,
  desk,
  tv,
  tablet,
  palm,
  alignEnd,
}) =>
  classNames(
    className,
    theme.col,
    theme[`desk${desk}`],
    theme[`tv${tv}`],
    theme[`tablet${tablet}`],
    theme[`palm${palm}`],
    {
      [theme.alignEnd]: alignEnd,
    }
  )

const Col = ({
  theme,
  children,
  desk,
  tv,
  tablet,
  palm,
  alignEnd,
  className,
}) => (
  <div className={classnames({
    theme,
    desk,
    tv,
    tablet,
    palm,
    alignEnd,
    className,
  })}
  >
    {children}
  </div>
)

Col.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from consumeTheme wrapper.
   */
  theme: shape({
    col: string,
    desk: string,
    tv: string,
    tablet: string,
    palm: string,
    alignEnd: string,
  }),
  /**
   * Sets of columns which will be rendered inside the row.
   */
  children: node,
  /**
   * Defines the number of columns in each break point for a desk media (1366~1919).
   */
  desk: number,
  /**
   * Defines the number of columns in each break point for a tv media ( >= 1920).
   */
  tv: number,
  /**
   * Defines the number of columns in each break point for a tablet media (641~1365).
   */
  tablet: number,
  /**
   * Defines the number of columns in each break point for a palm media (<=640).
   */
  palm: number,
  /**
   * Text alignment.
   */
  alignEnd: bool,
  /**
   * Custom css class which will be applied to the column.
   */
  className: string,
}

Col.defaultProps = {
  theme: {},
  children: null,
  desk: null,
  tv: null,
  tablet: null,
  palm: null,
  alignEnd: false,
  className: null,
}

export default consumeTheme(Col)
