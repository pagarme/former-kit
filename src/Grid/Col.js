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
  align,
  className,
  desk,
  palm,
  tablet,
  theme,
  tv,
}) => classNames(
  className,
  theme.col,
  theme[`desk${desk}`],
  theme[`tv${tv}`],
  theme[`tablet${tablet}`],
  theme[`palm${palm}`],
  theme[`${align}Align`]
)

const Col = ({
  align,
  children,
  className,
  desk,
  palm,
  tablet,
  theme,
  tv,
}) => (
  <div className={classnames({
    align,
    className,
    desk,
    palm,
    tablet,
    theme,
    tv,
  })}
  >
    {children}
  </div>
)

Col.propTypes = {
  /**
   * Text alignment. Can be either start, center or end
   */
  align: oneOf(['start', 'center', 'end']),
  /**
   * Sets of columns which will be rendered inside the row.
   */
  children: node,
  /**
   * Custom CSS class which will be applied to the column.
   */
  className: string,
  /**
   * Defines the number of columns in each breakpoint for a desk media ((width > 1024px) and (width < 1920px))
   */
  desk: number,
  /**
   * Defines the number of columns in each breakpoint for a palm media (<=640).
   */
  palm: number,
  /**
   * Defines the number of columns in each breakpoint for a tablet media ((width > 640px) and (width <= 1024px)).
   */
  tablet: number,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: shape({
    align: string,
    col: string,
    desk: string,
    palm: string,
    tablet: string,
    tv: string,
  }),
  /**
   * Defines the number of columns in each breakpoint for a tv media ( >= 1920).
   */
  tv: number,
}

Col.defaultProps = {
  align: 'start',
  children: null,
  className: null,
  desk: null,
  palm: null,
  tablet: null,
  theme: {},
  tv: null,
}

export default consumeTheme(Col)
