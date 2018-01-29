import React, { Component } from 'react'
import {
  arrayOf,
  bool,
  func,
  number,
  oneOf,
  oneOfType,
  shape,
  string,
} from 'prop-types'
import {
  __,
  always,
  append,
  anyPass,
  contains,
  drop,
  equals,
  ifElse,
  isNil,
  mapObjIndexed,
  modulo,
  pipe,
  prop,
  take,
  without,
} from 'ramda'
import classNames from 'classnames'
import { themr } from 'react-css-themr'

import TableHead from './TableHead'
import TableRow from './TableRow'
import TableExpandedRow from './TableExpandedRow'

const applyThemr = themr('UITable')

const toggleItem = item => ifElse(
  contains(item),
  without([item]),
  append(item)
)

const toggleRow = (rowIndex, rows) => {
  const toggle = toggleItem(rowIndex)
  return toggle(rows)
}

const isOdd = modulo(__, 2)

const getParityClass = ifElse(
  isOdd,
  always('odd'),
  always('even')
)

const isAscending = equals('ascending')

const getToggledOrder = ifElse(
  isAscending,
  always('descending'),
  always('ascending')
)

const hasOrderableColumn = columns =>
  columns.some(col => col.orderable)

const getArrowValidation = propName => pipe(
  prop(propName),
  isNil
)

const validateExpandIcon = getArrowValidation('expand')

const validateCollapseIcon = getArrowValidation('collapse')

const hasNoArrows = anyPass([
  validateExpandIcon,
  validateCollapseIcon,
])

const validateDescendingIcon = getArrowValidation('descending')
const validateAscendingIcon = getArrowValidation('ascending')
const validateOrderableIcon = getArrowValidation('orderable')

const hasNoHeadArrows = anyPass([
  validateDescendingIcon,
  validateAscendingIcon,
  validateOrderableIcon,
])

const validateElement = (element, key) => {
  if (isNil(element) || React.isValidElement(element)) {
    return true
  }

  throw new Error(`icons.${key} supplied to Table must be a simgle ReactElement`)
}

const validateIconsShape = (props, propName) => {
  if (propName === 'icons') {
    const { columns, icons, expandable } = props

    if (hasOrderableColumn(columns) && hasNoHeadArrows(icons)) {
      throw new Error('The prop icons must have props descending, ascending and orderable when any column is sortable')
    }

    if (expandable && hasNoArrows(icons)) {
      throw new Error('The prop icons must have props expand and collapse when the tabale has the expandable column')
    }

    mapObjIndexed(validateElement, icons)
  }
}

class Table extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hoveredRow: null,
    }
    this.handleColumnOrder = this.handleColumnOrder.bind(this)
    this.handleRowMouseLeave = this.handleRowMouseLeave.bind(this)
    this.handleRowClick = this.handleRowClick.bind(this)
    this.handleRowExpand = this.handleRowExpand.bind(this)
    this.handleRowMouseEnter = this.handleRowMouseEnter.bind(this)
    this.handleRowSelect = this.handleRowSelect.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.renderRow = this.renderRow.bind(this)
  }

  handleRowSelect (rowIndex) {
    const { onSelectRow, selectedRows } = this.props
    if (onSelectRow) {
      const rows = toggleRow(rowIndex, selectedRows)
      onSelectRow(rows)
    }
  }

  handleRowExpand (rowIndex) {
    const { expandedRows, onExpandRow } = this.props
    this.setState({
      hoveredRow: rowIndex,
    })
    if (onExpandRow) {
      const rows = toggleRow(rowIndex, expandedRows)
      onExpandRow(rows)
    }
  }

  handleColumnOrder (index) {
    const { orderSequence, onOrderChange, orderColumn } = this.props
    if (index === orderColumn) {
      onOrderChange(index, getToggledOrder(orderSequence))
    } else {
      onOrderChange(index, orderSequence)
    }
  }

  handleRowMouseEnter (index) {
    this.setState({
      hoveredRow: index,
    })
  }

  handleRowMouseLeave () {
    this.setState({
      hoveredRow: null,
    })
  }

  handleSelect () {
    const { onSelectRow, rows, selectedRows } = this.props
    if (onSelectRow) {
      let newOrder = []
      if (selectedRows.length !== rows.length) {
        newOrder = rows.map((row, index) => index)
      }
      onSelectRow(newOrder)
    }
  }

  handleRowClick (rowIndex) {
    const { onRowClick } = this.props
    if (onRowClick) {
      onRowClick(rowIndex)
    }
  }

  renderRow (row, index) {
    const {
      columns,
      expandable,
      expandedRows,
      icons,
      maxColumns,
      onRowClick,
      selectable,
      selectedRows,
      theme,
    } = this.props
    const isExpanded = contains(index, expandedRows)
    const isSelected = contains(index, selectedRows)
    const parityClass = getParityClass(index)
    const rowProps = {
      columns: columns.slice(0, maxColumns),
      clickable: !!onRowClick,
      maxColumns,
      data: row,
      expanded: isExpanded,
      expandable,
      index,
      key: `$row_${index}`,
      onClick: this.handleRowClick,
      onExpand: this.handleRowExpand,
      onSelect: this.handleRowSelect,
      selectable,
      selected: isSelected,
      parity: parityClass,
    }

    if (expandable) {
      const { expand, collapse } = icons
      rowProps.icons = {
        expand,
        collapse,
      }
    }

    if (isExpanded) {
      const hoverClass = classNames({
        [theme.hoverRow]: equals(index, this.state.hoveredRow),
      })

      return [
        (
          <TableRow
            className={hoverClass}
            onMouseEnter={this.handleRowMouseEnter}
            onMouseLeave={this.handleRowMouseLeave}
            {...rowProps}
          />
        ),
        (
          <TableExpandedRow
            className={hoverClass}
            columns={drop(maxColumns, columns)}
            data={row}
            index={index}
            parity={parityClass}
            onMouseEnter={this.handleRowMouseEnter}
            onMouseLeave={this.handleRowMouseLeave}
          />
        ),
      ]
    }

    return (
      <TableRow
        className={theme.row}
        {...rowProps}
      />
    )
  }

  render () {
    const {
      className,
      columns,
      expandable,
      icons,
      maxColumns,
      orderColumn,
      orderSequence,
      rows,
      selectable,
      selectedRows,
      theme,
    } = this.props
    const { ascending, descending, orderable } = icons
    const allSelected = selectedRows.length === rows.length
    const tableClasses = classNames(className, theme.table)
    return (
      <table className={tableClasses}>
        <TableHead
          columns={take(maxColumns, columns)}
          orderColumn={orderColumn}
          onOrderChange={this.handleColumnOrder}
          onSelect={this.handleSelect}
          selectable={selectable}
          expandable={expandable}
          selected={allSelected}
          order={orderSequence}
          icons={{
            ascending,
            descending,
            orderable,
          }}
        />
        <tbody className={theme.tableBody}>
          {
            rows.map(this.renderRow)
          }
        </tbody>
      </table>
    )
  }
}

Table.propTypes = {
  theme: shape({
    table: string,
  }),
  className: string,
  columns: arrayOf(shape({
    acessor: oneOfType([
      string,
      arrayOf(string),
    ]),
    isAction: bool,
    orderable: bool,
    renderer: func,
    title: string.isRequired,
  })).isRequired,
  expandable: bool,
  expandedRows: arrayOf(number),
  icons: validateIconsShape,
  maxColumns: number,
  onExpandRow: func,
  onOrderChange: func.isRequired,
  onRowClick: func,
  onSelectRow: func,
  orderColumn: number,
  orderSequence: oneOf(['ascending', 'descending']),
  rows: arrayOf(shape({})).isRequired,
  selectable: bool,
  selectedRows: arrayOf(number),
}

Table.defaultProps = {
  className: '',
  columns: [],
  expandable: false,
  expandedRows: [],
  icons: {},
  maxColumns: 7,
  onExpandRow: null,
  onRowClick: null,
  onSelectRow: null,
  orderColumn: 0,
  orderSequence: 'ascending',
  rows: [],
  selectable: false,
  selectedRows: [],
  theme: {},
}

export default applyThemr(Table)
