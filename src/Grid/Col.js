import React from 'react'
import classNames from 'classnames'
import {
  shape,
  string,
  node,
  number,
  oneOf,
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
  align,
}) =>
  classNames(
    className,
    theme.col,
    theme[`desk${desk}`],
    theme[`tv${tv}`],
    theme[`tablet${tablet}`],
    theme[`palm${palm}`],
    theme[`${align}Align`]
  )

const Col = ({
  theme,
  children,
  desk,
  tv,
  tablet,
  palm,
  align,
  className,
}) => (
  <div className={classnames({
    theme,
    desk,
    tv,
    tablet,
    palm,
    align,
    className,
  })}
  >
    {children}
  </div>
)

Col.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: shape({
    col: string,
    desk: string,
    tv: string,
    tablet: string,
    palm: string,
    align: string,
  }),
  /**
   * Sets of columns which will be rendered inside the row.
   */
  children: node,
  /**
   * Defines the number of columns in each breakpoint for a desk media (1366~1919).
   */
  desk: number,
  /**
   * Defines the number of columns in each breakpoint for a tv media ( >= 1920).
   */
  tv: number,
  /**
   * Defines the number of columns in each breakpoint for a tablet media (641~1365).
   */
  tablet: number,
  /**
   * Defines the number of columns in each breakpoint for a palm media (<=640).
   */
  palm: number,
  /**
   * Text alignment. Can be either start, center or end
   */
  align: oneOf(['start', 'center', 'end']),
  /**
   * Custom CSS class which will be applied to the column.
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
  align: 'start',
  className: null,
}

export default consumeTheme(Col)
