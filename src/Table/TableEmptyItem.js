import React from 'react'
import {
  shape,
  string,
} from 'prop-types'
import classNames from 'classnames'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UITable')

const TableEmptyItem = ({ className, theme }) => (
  <span className={
    classNames(
      theme.empty,
      theme.unselectable,
      className
    )
  }
  />
)

TableEmptyItem.propTypes = {
  /**
   * Aditional CSS classes which can be applied to the empty items.
   */
  className: string,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: shape({
    empty: string,
  }),
}

TableEmptyItem.defaultProps = {
  className: '',
  theme: {},
}

export default consumeTheme(TableEmptyItem)
