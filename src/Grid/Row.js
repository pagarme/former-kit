import React from 'react'
import classNames from 'classnames'
import {
  shape,
  string,
  node,
  bool,
} from 'prop-types'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIGrid')

const classnames = ({
  className,
  flex,
  stretch,
  theme,
}) => classNames(
  className,
  theme.row,
  {
    [theme.flex]: flex,
    [theme.stretch]: stretch,
  }
)

/**
 * Row structure used in the Grid component.
 */
const Row = ({
  children,
  className,
  flex,
  stretch,
  theme,
}) => (
  <div className={classnames({
    className,
    flex,
    stretch,
    theme,
  })}
  >
    {children}
  </div>
)

Row.propTypes = {
  /**
   * The columns which will be rendered inside the row.
   */
  children: node,
  /**
   * Custom CSS class which will be applied to the row.
   */
  className: string,
  /**
   * Make columns grow horizontally.
   */
  flex: bool,
  /**
   * Make columns grow vertically based on tallest column.
   */
  stretch: bool,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: shape({
    flex: string,
    row: string,
    stretch: string,
  }),
}

Row.defaultProps = {
  children: null,
  className: null,
  flex: false,
  stretch: false,
  theme: {},
}

export default consumeTheme(Row)
