import React from 'react'
import {
  arrayOf,
  node,
  number,
  oneOfType,
  shape,
  string,
} from 'prop-types'

import ThemeConsumer from '../ThemeConsumer'
import TableEmptyItem from './TableEmptyItem'

const consumeTheme = ThemeConsumer('UITable')

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

const TableExpandedItem = ({
  theme,
  title,
  text,
  children,
}) => (
  <div className={theme.expandedItem}>
    <span className={theme.title}>{title}</span>
    { renderItem(theme, text, children) }
  </div>
)

TableExpandedItem.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: shape({
    expandedItem: string,
    text: string,
    title: string,
  }),
  /**
   * React element which will be shown under the item title in the list.
   */
  children: oneOfType([arrayOf(node), node]),
  /**
   * Text that will be shown in the list if the 'children' prop isn't set.
   */
  text: oneOfType([string, number]),
  /**
   * Item title in the expanded row items list.
   */
  title: string.isRequired,
}

TableExpandedItem.defaultProps = {
  children: null,
  text: '',
  theme: {},
}

export default consumeTheme(TableExpandedItem)
