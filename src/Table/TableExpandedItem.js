import React from 'react'
import { themr } from 'react-css-themr'
import {
  arrayOf,
  node,
  number,
  oneOfType,
  shape,
  string,
} from 'prop-types'

import TableEmptyItem from './TableEmptyItem'

const applyThemr = themr('UITable')

const renderItem = (theme, text, children) => {
  if (children) {
    return children
  }

  if (text) {
    return (
      <span className={theme.text}>
        {text}
      </span>
    )
  }

  return <TableEmptyItem className={theme.text} />
}

const TableExpandedItem = ({ theme, title, text, children }) => (
  <div className={theme.expandedItem}>
    <span className={theme.title}>{title}</span>
    { renderItem(theme, text, children) }
  </div>
)

TableExpandedItem.propTypes = {
  theme: shape({
    expandedItem: string,
    title: string,
    text: string,
  }),
  title: string.isRequired,
  text: oneOfType([string, number]),
  children: oneOfType([arrayOf(node), node]),
}

TableExpandedItem.defaultProps = {
  theme: {},
  text: '',
  children: null,
}

export default applyThemr(TableExpandedItem)
