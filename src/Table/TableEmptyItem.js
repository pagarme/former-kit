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
  theme: shape({
    empty: string,
  }),
  className: string,
}

TableEmptyItem.defaultProps = {
  theme: {},
  className: '',
}

export default consumeTheme(TableEmptyItem)
