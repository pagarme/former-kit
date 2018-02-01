import React from 'react'
import {
  shape,
  string,
} from 'prop-types'
import classNames from 'classnames'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UITable')

const TableEmptyItem = ({ theme, className }) => (
  <span className={classNames(theme.empty, className)} />
)

TableEmptyItem.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from consumeTheme wrapper.
   */
  theme: shape({
    empty: string,
  }),
  /**
   * Aditional CSS classes which can be applied to the empty items.
   */
  className: string,
}

TableEmptyItem.defaultProps = {
  theme: {},
  className: '',
}

export default consumeTheme(TableEmptyItem)
