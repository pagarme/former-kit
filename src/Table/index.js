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
  not,
  pipe,
  prop,
  take,
  without,
} from 'ramda'
import classNames from 'classnames'
import ThemeConsumer from '../ThemeConsumer'

import TableHead from './TableHead'
import TableRow from './TableRow'
import TableExpandedRow from './TableExpandedRow'

const consumeTheme = ThemeConsumer('UITable')

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

const validateOrderableFunction = (props, propName) => {
  if (propName === 'onOrderChange') {
    const { onOrderChange, columns } = props
    if (hasOrderableColumn(columns) && isNil(onOrderChange)) {
      throw new Error('The prop onOrderChange must be a function when some column is orderable')
    }
  }
}

/**
 * This component is designed to show tabular data with some customizations,
 * allowing the user to sort, select and click rows, also show rows details
 * with the expandable function.
 * The columns must have a specific structure which allows the data read and
 * cells output customization.
 * The table is not responsible for the data received, all events trigged in
 * this component is thrown to the parent component to keep the table without
 * business logic.
 */
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
      disabled,
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
    const key = `row_${index}`
    const rowProps = {
      clickable: !!onRowClick,
      columns: columns.slice(0, maxColumns),
      data: row,
      disabled,
      expandable,
      expanded: isExpanded,
      index,
      key,
      maxColumns,
      onClick: this.handleRowClick,
      onExpand: this.handleRowExpand,
      onSelect: this.handleRowSelect,
      parity: parityClass,
      selectable,
      selected: isSelected,
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
      const expandedKey = `expanded_${key}`
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
            key={expandedKey}
            parity={parityClass}
            maxColumns={maxColumns}
            onMouseEnter={this.handleRowMouseEnter}
            onMouseLeave={this.handleRowMouseLeave}
            selectable={selectable}
            disabled={disabled}
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
      disabled,
      expandable,
      headerAlign,
      icons,
      maxColumns,
      onOrderChange,
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
    const hasOrderChange = not(isNil(onOrderChange))
    return (
      <table className={tableClasses}>
        <TableHead
          columns={take(maxColumns, columns)}
          disabled={disabled}
          expandable={expandable}
          align={headerAlign}
          icons={{
            ascending,
            descending,
            orderable,
          }}
          onOrderChange={hasOrderChange ? this.handleColumnOrder : null}
          onSelect={this.handleSelect}
          order={orderSequence}
          orderColumn={orderColumn}
          selectable={selectable}
          selected={allSelected}
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
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: shape({
    /**
     * Base table class
     */
    table: string,
  }),
  /**
   * Additional CSS classes which can be applied to the table component.
   */
  className: string,
  /**
   * A set of objects which represents the table columns and determine
   * how the rows props will be accessed in the table construction functions.
   */
  columns: arrayOf(shape({
    /**
     * The path for the cell value in the row object,
     * it's required for orderable columns.
     */
    accessor: oneOfType([
      string,
      arrayOf(string),
    ]),
    /**
     * Defines the cell content alignment
     */
    align: oneOf(['center', 'start', 'end']),
    /**
     * Identify if it's an action column.
     */
    isAction: bool,
    /**
     * Enable a column to be orderable.
     */
    orderable: bool,
    /**
     * A custom function which will receive the row data object and should return
     * a React element to be rendered in each cell bound to this column.
     */
    renderer: func,
    /**
     * This title is used to identify the column in the header and to identify the
     * column data in the expandable rows.
     */
    title: string.isRequired,
  })).isRequired,
  /**
   * Enables the expandable column in the table which allows the user to see all of the remaining
   * columns which exceed the table maxColumns prop.
   */
  expandable: bool,
  /**
   * List of indexes of expanded rows in the table.
   */
  expandedRows: arrayOf(number),
  /**
   * Defines the header cell's content alignment when
   * the columns aren't orderable
   */
  headerAlign: oneOf(['center', 'start', 'end']),
  /**
   * Default actions icons.
   * @prop {object} expand - icon which represents expand acion in expandable button.
   * @prop {object} collapse - icon which represents collapse acion in expandable button.
   */
  icons: validateIconsShape,
  /**
   * Number of table columns, all the remaining columns will be dropped in an expandable
   * line if the expandable option is true.
   */
  maxColumns: number,
  /**
   * It's called when a row is expanded using the expandable button
   * @param {Array<number>} rows - all expanded rows indexes in the table.
   */
  onExpandRow: func,
  /**
   * It's called when a orderable column in the header is clicked.
   * @param {int} index - order column index.
   * @param {string} order - rows order, can be `ascending` or `descending`.
   */
  onOrderChange: validateOrderableFunction,
  /**
   * It's called when a clickable row is clicked.
   * @param {int} index - clicked row index.
   */
  onRowClick: func,
  /**
   * It's called when a row is selected by the selectable column checkbox.
   * @param {Array<number>} rows - all selected rows indexes.
   */
  onSelectRow: func,
  /**
   * Default order column index.
   */
  orderColumn: number,
  /**
   * Rows order sequence.
   */
  orderSequence: oneOf(['ascending', 'descending']),
  /**
   * List of object which will feed the table with data.
   */
  rows: arrayOf(shape({})).isRequired,
  /**
   * Enables the selectable column in the table, allowing the user to select one,
   * many or all of the rows.
   */
  selectable: bool,
  /**
   * List of selected rows indexes.
   */
  selectedRows: arrayOf(number),
  /**
   * Disable all table functions
   */
  disabled: bool,
}

Table.defaultProps = {
  className: '',
  disabled: false,
  expandable: false,
  expandedRows: [],
  headerAlign: 'left',
  icons: {},
  maxColumns: 7,
  onExpandRow: null,
  onOrderChange: null,
  onRowClick: null,
  onSelectRow: null,
  orderColumn: 0,
  orderSequence: 'ascending',
  selectable: false,
  selectedRows: [],
  theme: {},
}

export default consumeTheme(Table)
