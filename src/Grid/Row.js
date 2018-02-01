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
  theme,
  flex,
  stretch,
  className,
}) =>
  classNames(
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
  theme,
  children,
  flex,
  stretch,
  className,
}) => (
  <div className={classnames({
    theme,
    flex,
    stretch,
    className,
    })}
  >
    {children}
  </div>
)

Row.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from consumeTheme wrapper.
   */
  theme: shape({
    row: string,
    flex: string,
    stretch: string,
  }),
  /**
   * The columns which will be rendered inside the row.
   */
  children: node,
  /**
   * Make columns grow horizontally.
   */
  flex: bool,
  /**
   * Make columns grow vertically based on tallest column.
   */
  stretch: bool,
  /**
   * Custom CSS class which will be applied to the row.
   */
  className: string,
}

Row.defaultProps = {
  theme: {},
  children: null,
  flex: false,
  stretch: false,
  className: null,
}

export default consumeTheme(Row)
