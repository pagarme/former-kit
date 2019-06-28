import React, { Component } from 'react'
import { bool } from 'prop-types'
import {
  compose,
  defaultTo,
  equals,
  findIndex,
  path,
  pipe,
  reverse,
  sortBy,
  toLower,
} from 'ramda'

import Table from '../index'
import getMock from './tableMock'

const isAscending = equals('ascending')

const rowSort = accessor => sortBy(
  compose(
    toLower,
    defaultTo(''),
    path(accessor)
  )
)

const getSort = (accessor, order) => (
  isAscending(order)
    ? rowSort(accessor)
    : pipe(rowSort(accessor), reverse)
)

const getRowsSort = (rows, columns) => (orderColumn, order) => {
  const referenceColumn = columns[orderColumn]
  const referenceAccessor = referenceColumn.accessor
  const sort = getSort(referenceAccessor, order)
  return sort(rows)
}

const addSizeProp = list => list.map((column, i) => ({
  ...column,
  width: i % 2 === 0 ? 80 : 200,
}))

class TableState extends Component {
  constructor (props) {
    super(props)

    this.getColumns = this.getColumns.bind(this)
    this.getColumnsWithPrimaryAction = this
      .getColumnsWithPrimaryAction.bind(this)
    this.handleExpandRow = this.handleExpandRow.bind(this)
    this.handleOrderChange = this.handleOrderChange.bind(this)
    this.handleSelectRow = this.handleSelectRow.bind(this)
    const mock = getMock(this.handleDetailsClick)
    this.mock = {
      ...mock,
      columns: addSizeProp(mock.columns),
    }
    this.state = {
      columns: this.getColumns(props.primaryAction),
      expandedRows: [],
      order: 'ascending',
      orderColumn: 0,
      rows: this.mock.rows,
      selectedRows: [],
    }
  }

  getColumns (primaryActions) {
    return (
      primaryActions
        ? this.getColumnsWithPrimaryAction()
        : this.mock.columns
    )
  }

  getColumnsWithPrimaryAction (columnCount = 7) {
    const cols = this.mock.columns.map(col => col)
    const actionIndex = findIndex(a => (a.isAction), cols)
    const action = cols.splice(actionIndex, 1)[0]
    cols.splice((columnCount - 1), 1, action)
    return cols
  }

  handleOrderChange (index, order) {
    const { columns, rows } = this.state
    const sortByOrderColumn = getRowsSort(rows, columns)
    const sortedRows = sortByOrderColumn(index, order)

    this.setState({
      expandedRows: [],
      order,
      orderColumn: index,
      rows: sortedRows,
      selectedRows: [],
    })
  }

  handleSelectRow (selectedRows) {
    this.setState({
      selectedRows,
    })
  }

  handleExpandRow (expandedRows) {
    this.setState({
      expandedRows,
    })
  }

  render () {
    const {
      clickableRow,
      empty,
      expandable,
      selectable,
    } = this.props
    const {
      columns,
      expandedRows,
      order,
      orderColumn,
      rows,
      selectedRows,
    } = this.state
    const emptyMessage = empty ? 'No items found' : null
    const onRowClick = clickableRow ? this.handleRowClick : null
    const tableRows = empty ? [] : rows
    return (
      <div>
        <Table
          columns={columns}
          disabled={empty}
          emptyMessage={emptyMessage}
          expandable={expandable}
          expandedRows={expandedRows}
          maxColumns={4}
          onExpandRow={this.handleExpandRow}
          onOrderChange={this.handleOrderChange}
          onRowClick={onRowClick}
          onSelectRow={this.handleSelectRow}
          orderColumn={orderColumn}
          orderSequence={order}
          rows={tableRows}
          selectable={selectable}
          selectedRows={selectedRows}
        />

        <div>
          {
            expandable
              && selectable
              && (
                <div>
                  <div> Selected rows { selectedRows.length } </div>
                  <div> Expanded rows { expandedRows.length } </div>
                </div>
              )
          }
        </div>
      </div>
    )
  }
}

TableState.propTypes = {
  clickableRow: bool,
  empty: bool,
  expandable: bool,
  primaryAction: bool,
  selectable: bool,
}

TableState.defaultProps = {
  clickableRow: false,
  empty: false,
  expandable: false,
  primaryAction: false,
  selectable: false,
}

export default TableState
