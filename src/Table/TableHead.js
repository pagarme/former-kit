import React, { Component } from 'react'
import {
  arrayOf,
  bool,
  element,
  func,
  number,
  oneOfType,
  shape,
  string,
} from 'prop-types'
import { equals } from 'ramda'
import classNames from 'classnames'
import { themr } from 'react-css-themr'
import shortid from 'shortid'
import Checkbox from '../Checkbox'

const applyThemr = themr('UITable')
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
    const orderable = column.orderable
    const columnClasses = classNames(
      {
        [theme.active]: selected,
        [theme.orderable]: orderable,
      }
    )

    if (!orderable) {
      return (
        <th
          key={`column_${index + 1}`}
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
  theme: shape({
    tableHead: string,
    ascending: string,
    descending: string,
    open: string,
    tableHeadItem: string,
  }),
  columns: arrayOf(shape({
    title: string.isRequired,
    acessor: oneOfType([
      string,
      arrayOf(string),
    ]),
    renderer: func,
  })).isRequired,
  expandable: bool,
  icons: shape({
    ascending: element,
    descending: element,
    orderable: element,
  }),
  onOrderChange: func,
  onSelect: func,
  order: string,
  orderColumn: number.isRequired,
  selectable: bool,
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

export default applyThemr(TableHead)
