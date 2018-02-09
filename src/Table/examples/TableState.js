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

const rowSort = acessor =>
  sortBy(compose(toLower, defaultTo(''), path(acessor)))

const getSort = (acessor, order) => (
  isAscending(order) ?
    rowSort(acessor) :
    pipe(rowSort(acessor), reverse)
)

const getRowsSort = (rows, columns) =>
  (orderColumn, order) => {
    const referenceColumn = columns[orderColumn]
    const referenceAcessor = referenceColumn.acessor
    const sort = getSort(referenceAcessor, order)
    return sort(rows)
  }

class TableState extends Component {
  constructor (props) {
    super(props)

    this.handleExpandRow = this.handleExpandRow.bind(this)
    this.handleOrderChange = this.handleOrderChange.bind(this)
    this.handleSelectRow = this.handleSelectRow.bind(this)
    this.getColumns = this.getColumns.bind(this)
    this.getColumnsWithPrimaryAction = this.getColumnsWithPrimaryAction.bind(this)
    this.mock = getMock(this.handleDetailsClick)
    this.state = {
      orderColumn: 0,
      order: 'ascending',
      rows: this.mock.rows,
      columns: this.getColumns(props.primaryAction),
      selectedRows: [],
      expandedRows: [],
    }
  }

  getColumns (primaryActions) {
    return (
      primaryActions ?
        this.getColumnsWithPrimaryAction() :
        this.mock.columns
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
    const { rows, columns } = this.state
    const sortByOrderColumn = getRowsSort(rows, columns)
    const sortedRows = sortByOrderColumn(index, order)
    this.setState({
      orderColumn: index,
      order,
      rows: sortedRows,
      selectedRows: [],
      expandedRows: [],
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
      selectable,
      expandable,
    } = this.props
    const {
      columns,
      expandedRows,
      order,
      orderColumn,
      rows,
      selectedRows,
    } = this.state

    const onRowClick = clickableRow ? this.handleRowClick : null

    return (
      <div>
        <Table
          columns={columns}
          rows={rows}
          selectable={selectable}
          expandable={expandable}
          selectedRows={selectedRows}
          expandedRows={expandedRows}
          onOrderChange={this.handleOrderChange}
          onSelectRow={this.handleSelectRow}
          orderSequence={order}
          orderColumn={orderColumn}
          onExpandRow={this.handleExpandRow}
          onRowClick={onRowClick}
          maxColumns={4}
        />

        <div>
          {
            expandable && selectable &&
            <div>
              <div> Selected rows { selectedRows.length } </div>
              <div> Expanded rows { expandedRows.length } </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

TableState.propTypes = {
  clickableRow: bool,
  selectable: bool,
  expandable: bool,
  primaryAction: bool,
}

TableState.defaultProps = {
  clickableRow: false,
  selectable: false,
  expandable: false,
  primaryAction: false,
}

export default TableState
