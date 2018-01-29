import React from 'react'
import { themr } from 'react-css-themr'
import {
  shape,
  string,
} from 'prop-types'
import classNames from 'classnames'

const applyThemr = themr('UITable')

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

export default applyThemr(TableEmptyItem)
