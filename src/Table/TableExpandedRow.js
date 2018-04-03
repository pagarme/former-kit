import React, { PureComponent } from 'react'
import {
  arrayOf,
  bool,
  func,
  oneOf,
  oneOfType,
  number,
  shape,
  string,
} from 'prop-types'
import {
  always,
  anyPass,
  call,
  identity,
  ifElse,
  isEmpty,
  isNil,
  path,
  pipe,
} from 'ramda'
import classNames from 'classnames'
import ThemeConsumer from '../ThemeConsumer'
import TableExpandedItem from './TableExpandedItem'
import TableEmptyItem from './TableEmptyItem'

const consumeTheme = ThemeConsumer('UITable')

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


class TableExpandedRow extends PureComponent {
  constructor (props) {
    super(props)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.renderAction = this.renderAction.bind(this)
    this.renderColumn = this.renderColumn.bind(this)
    this.getColspan = this.getColspan.bind(this)
  }

  getColspan () {
    const { selectable, maxColumns } = this.props

    if (selectable) {
      return maxColumns + 2
    }

    return maxColumns + 1
  }

  handleMouseEnter () {
    const { onMouseEnter, index } = this.props
    onMouseEnter(index)
  }

  handleMouseLeave () {
    const { onMouseLeave, index } = this.props
    onMouseLeave(index)
  }

  renderColumn (column, index) {
    const { data } = this.props
    return (
      <li key={`colum_${index}`}>
        <TableExpandedItem
          title={column.title}
          text={path(column.accessor, data)}
        >
          {
            column.renderer &&
            normalizeRendererResult(column.renderer, data)
          }
        </TableExpandedItem>

      </li>
    )
  }

  renderAction (column, idx) {
    const { index } = this.props
    return (
      <div key={`action_${index}_${idx}`}>
        { normalizeRendererResult(column.renderer, index) }
      </div>
    )
  }

  render () {
    const {
      className,
      columns,
      disabled,
      parity,
      theme,
    } = this.props
    const cols = columns.filter(col => !col.isAction).map(this.renderColumn)
    const actions = columns.filter(col => col.isAction).map(this.renderAction)
    const rowClasses = classNames(
      className,
      theme[parity],
      theme.expandedRow,
      {
        [theme.disabled]: disabled,
      }
    )
    const trProps = disabled ? {} :
      {
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
      }

    return (
      <tr
        className={rowClasses}
        tabIndex="0"
        {...trProps}
      >
        <td colSpan={this.getColspan()}>
          <div className={theme.expandable}>
            <ul>
              {cols}
            </ul>
            {
              !isEmpty(actions) &&
              <div className={
                  classNames(
                    theme.expandableActions,
                    theme.unselectable
                  )
                }
              >
                {actions}
              </div>
            }
          </div>
        </td>
      </tr>
    )
  }
}

TableExpandedRow.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: shape({
    disabled: string,
    even: string,
    expandable: string,
    odd: string,
    tableRow: string,
  }),
  /**
   * Aditional CSS classes which can be applyed to the expanded row.
   */
  className: string,
  /**
   * Columns which will provide access to the data received.
   * These columns are the columns which are not shown in the table.
   */
  columns: arrayOf(shape({
    title: string.isRequired,
    accessor: oneOfType([
      string,
      arrayOf(string),
    ]),
    renderer: func,
  })).isRequired,
  /**
   * Set of data native of row data from the table.
   */
  data: shape({}).isRequired,
  /**
   * Set of data native of row data from the table.
   */
  disabled: bool,
  /**
   * Row index.
   */
  index: number.isRequired,
  /**
   * Number of table columns, all the remaining columns will be dropped in an expandable
   * line if the expandable option is true.
   */
  maxColumns: number,
  /**
   * Function triggered when the mouse enters in the component (hover in).
   * @param {number} index
   */
  onMouseEnter: func.isRequired,
  /**
   * Function triggered when the mouse leaves the component (hover out).
   * @param {number} index
   */
  onMouseLeave: func.isRequired,
  /**
   * Define the line color.
   */
  parity: oneOf(['even', 'odd']),
  /**
   * It enables the selectable column in the table, allowing the user to select one,
   * many or all of the rows.
   */
  selectable: bool,
}

TableExpandedRow.defaultProps = {
  className: '',
  disabled: false,
  parity: '',
  maxColumns: 7,
  selectable: false,
  theme: {},
}

export default consumeTheme(TableExpandedRow)
