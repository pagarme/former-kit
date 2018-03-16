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
import {
  always,
  anyPass,
  call,
  has,
  identity,
  ifElse,
  isEmpty,
  isNil,
  path,
  pipe,
} from 'ramda'
import classNames from 'classnames'
import shortid from 'shortid'

import Button from '../Button'
import Checkbox from '../Checkbox'
import ThemeConsumer from '../ThemeConsumer'
import TableEmptyItem from './TableEmptyItem'


const consumeTheme = ThemeConsumer('UITable')

const hasRenderer = has('renderer')

const renderItem = ifElse(
  isNil,
  always(null),
  call
)

const normalizeRendererResult = pipe(
  renderItem,
  ifElse(
    anyPass([isNil, isEmpty]),
    always(<TableEmptyItem />),
    identity
  )
)

const renderCell = (column, data, key, theme) => {
  if (hasRenderer(column)) {
    return (
      <td
        key={key}
        className={
          classNames(
            theme.tableItem,
            theme[`${column.align}Align`],
            {
              [theme.unselectable]: column.isAction,
            }
          )
        }
      >
        { normalizeRendererResult(column.renderer, data) }
      </td>
    )
  }

  const columnData = path(column.accessor, data)
  if (columnData) {
    return (
      <td
        key={key}
        className={
          classNames(
            theme.tableItem,
            theme[`${column.align}Align`]
          )
        }
      >
        {columnData}
      </td>
    )
  }
  return (
    <td
      key={key}
      className={theme.tableItem}
    >
      <TableEmptyItem />
    </td>
  )
}

const renderCells = (columns, data, lineIndex, theme) =>
  columns.map((col, index) => renderCell(col, data, `${lineIndex}_${index}`, theme))

class TableRow extends Component {
  constructor (props) {
    super(props)

    this.checkboxId = shortid.generate()
    this.getArrowIcon = this.getArrowIcon.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleExpand = this.handleExpand.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  getArrowIcon (expanded) {
    const { expand, collapse } = this.props.icons

    if (expanded) {
      return collapse
    }

    return expand
  }

  handleClick () {
    const { index, onClick } = this.props
    if (onClick) {
      onClick(index)
    }
  }

  handleExpand () {
    const { index, onExpand } = this.props
    if (onExpand) {
      onExpand(index)
    }
  }

  handleMouseEnter () {
    const { onMouseEnter, index } = this.props
    if (onMouseEnter) {
      onMouseEnter(index)
    }
  }

  handleMouseLeave () {
    const { onMouseLeave, index } = this.props
    if (onMouseLeave) {
      onMouseLeave(index)
    }
  }

  handleSelect () {
    const { index, onSelect } = this.props
    if (onSelect) {
      onSelect(index)
    }
  }

  render () {
    const {
      className,
      clickable,
      columns,
      data,
      disabled,
      expanded,
      expandable,
      index,
      selectable,
      selected,
      parity,
      theme,
    } = this.props

    const tableRow = classNames(
      theme[parity],
      className,
      {
        [theme.clickable]: clickable,
        [theme.disabled]: disabled,
      }
    )

    const lineIndex = `line_${index}`

    const trProps = disabled ? {} : {
      onClick: this.handleClick,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
    }

    return (
      <tr
        className={tableRow}
        tabIndex="0"
        {...trProps}
      >
        {
          selectable &&
          <td className={theme.check}>
            <Checkbox
              checked={selected}
              disabled={disabled}
              id={this.checkboxId}
              label=""
              name={lineIndex}
              onChange={this.handleSelect}
              value={`${index}`}
            />
          </td>
        }
        {renderCells(columns, data, lineIndex, theme)}
        {
          expandable &&
          <td className={
              classNames(
                theme.open,
                theme.unselectable
              )
            }
          >
            <Button
              disabled={disabled}
              fill="outline"
              icon={this.getArrowIcon(expanded)}
              onClick={this.handleExpand}
              relevance="low"
              size="tiny"
              type="button"
            />
          </td>
        }
      </tr>
    )
  }
}

TableRow.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: shape({
    disabled: string,
    even: string,
    odd: string,
    check: string,
    status: string,
    open: string,
  }),
  /**
   * Additional CSS classes which can be applyed to the expanded row.
   */
  className: string,
  /**
   * Allow the clickable feature which will trigger the onClick
   * function when the line or it children is clicked
   */
  clickable: bool,
  /**
   * Columns which will provide access to the data received.
   * These columns are the columns which are not shown in the table.
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
     * Pure function which will receive the total accumulated and the current cell value.
     * Its return will be rendered in the total row in the footer or it will
     * be sent to the total renderer.
     * @param {number} total - accumulated value for this column
     * @param {number} value - current cell value
     */
    aggregator: func,
    /**
     * Defines the cell content alignment.
     */
    align: oneOf(['center', 'start', 'end']),
    /**
     * Identifies if it's an action column.
     */
    isAction: bool,
    /**
     * Enables a column to be orderable.
     */
    orderable: bool,
    /**
     * A custom function which will receive the row data object and should return
     * a React element to be rendered in each cell bound to this column.
     * @param {object} row - all row data.
     */
    renderer: func,
    /**
     * This title is used to identify the column in the header and to identify the
     * column data in the expandable rows.
     */
    title: string.isRequired,
    /**
     * Function responsible for creating a cell component to be added to the total
     * row in the footer, works like the renderer prop.
     * @param {object} row - all row data.
     */
    aggregationRenderer: func,
    /**
     * Text which will be used as title in the footer total row, when this prop is received
     * the aggregator and aggregationRenderer props are ignored.
     */
    aggregationTitle: string,
  })).isRequired,
  /**
   * Set of data native of row data from the table.
   */
  data: shape({}).isRequired,
  /**
   * Indicates that the line is not interactive.
   */
  disabled: bool,
  /**
   * Indicates that the line is showing details
   */
  expanded: bool,
  /**
   * Allow the expandable feature wich provides a
   * detail line under the expanded line.
   */
  expandable: bool,
  /**
   * Default icons used in to indicate if the line is expanded or collapsed.
   * @prop {object} expand - icon which represents expand acion in expandable button.
   * @prop {object} collapse - icon which represents collapse acion in expandable button.
   */
  icons: shape({
    collapse: element,
    expand: element,
  }),
  /**
   * Function trigged when the line or its children
   * are clicked, only works if the line is enabled.
   */
  onClick: func,
  /**
   * Function trigged when expandable button is clicked
   * passing the row data to the callback.
   * @param {Array<number>} rows - all expanded rows indexes in the table.
   */
  onExpand: func,
  /**
   * Function trigged on the line hover.
   */
  onMouseEnter: func,
  /**
   * Function trigged on the line blur.
   */
  onMouseLeave: func,
  /**
   * Function trigged when the line is selected
   * using the select checkbox created when the
   * prop selectable is received.
   */
  onSelect: func,
  /**
   * Indicates the row selection.
   * @param {number} row - selected row index.
   */
  selected: bool,
  /**
   * Indicates that the line can be selected.
   */
  selectable: bool,
  /**
   * Define the line color.
   */
  parity: oneOf(['even', 'odd']),
  /**
   * Indicates the row position in the table.
   */
  index: number.isRequired,
}

TableRow.defaultProps = {
  className: '',
  clickable: false,
  disabled: false,
  expandable: false,
  expanded: false,
  icons: {},
  onClick: null,
  onExpand: null,
  onMouseEnter: null,
  onMouseLeave: null,
  onSelect: null,
  parity: 'even',
  selectable: false,
  selected: false,
  theme: {},
}

export default consumeTheme(TableRow)
