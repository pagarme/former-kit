import React, { Component } from 'react'
import {
  arrayOf,
  bool,
  element,
  func,
  number,
  oneOf,
  oneOfType,
  shape,
  string,
} from 'prop-types'
import { equals } from 'ramda'
import classNames from 'classnames'
import shortid from 'shortid'
import Checkbox from '../Checkbox'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UITable')
const isAscending = equals('ascending')

class TableHead extends Component {
  constructor (props) {
    super(props)

    this.checkboxId = shortid.generate()
    this.getOrderIcon = this.getOrderIcon.bind(this)
    this.handleOrderChange = this.handleOrderChange.bind(this)
    this.renderColumn = this.renderColumn.bind(this)
  }

  getOrderIcon (order) {
    const { ascending, descending } = this.props.icons

    if (isAscending(order)) {
      return ascending
    }

    return descending
  }

  handleOrderChange (index) {
    this.props.onOrderChange(index)
  }

  renderColumn (column, index) {
    const {
      theme,
      orderColumn,
      order,
      icons,
    } = this.props
    const selected = orderColumn === index
    const { orderable } = column
    const columnClasses = classNames({
      [theme.active]: selected,
      [theme.orderable]: orderable,
    })

    if (!orderable) {
      return (
        <th
          key={`header_column_${index + 1}`}
          className={columnClasses}
        >
          <div className={theme.tableHeadItem}>
            {column.title}
          </div>
        </th>
      )
    }

    return (
      <th
        key={`column_${index + 1}`}
        className={columnClasses}
        onClick={() => this.handleOrderChange(index)}
      >
        <div className={theme.tableHeadItem}>
          <span> {column.title} </span>
          {
            selected &&
            <span>{ this.getOrderIcon(order) }</span>
          }
          {
            !selected &&
            <span>{icons.orderable}</span>
          }
        </div>
      </th>
    )
  }

  render () {
    const {
      selected,
      columns,
      expandable,
      onSelect,
      selectable,
      theme,
    } = this.props

    return (
      <thead className={theme.tableHead}>
        <tr>
          {
            selectable &&
            <th className={theme.check}>
              <Checkbox
                name="all"
                id={this.checkboxId}
                value="all"
                label=""
                onChange={onSelect}
                checked={selected}
              />
            </th>
          }
          {columns.map(this.renderColumn)}
          {
            expandable &&
            <th className={theme.open} />
          }
        </tr>
      </thead>
    )
  }
}

TableHead.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from consumeTheme wrapper.
   */
  theme: shape({
    tableHead: string,
    ascending: string,
    descending: string,
    open: string,
    tableHeadItem: string,
  }),
  /**
   * Columns which will name the reader cells.
   */
  columns: arrayOf(shape({
    title: string.isRequired,
    acessor: oneOfType([
      string,
      arrayOf(string),
    ]),
    renderer: func,
  })).isRequired,
  /**
   * Add an expandable column in the header.
   */
  expandable: bool,
  /**
   * Default icons which illustrate the order.
   */
  icons: shape({
    ascending: element,
    descending: element,
    orderable: element,
  }),
  /**
   * It's called when a orderable column in the header is clicked.
   * @param {int} index - order column index.
   */
  onOrderChange: func,
  /**
   * It's called when the checkbox from the selectable column is checked.
   */
  onSelect: func,
  /**
   * Rows order sequence.
   */
  order: oneOf(['ascending', 'descending']),
  /**
   * Default order column index.
   */
  orderColumn: number.isRequired,
  /**
   * Enables the selectable column.
   */
  selectable: bool,
  /**
   * Selectable column checkbox state.
   */
  selected: bool,
}

TableHead.defaultProps = {
  expandable: false,
  icons: {},
  onOrderChange: null,
  onSelect: null,
  order: 'ascending',
  selectable: false,
  selected: false,
  theme: {},
}

export default consumeTheme(TableHead)
