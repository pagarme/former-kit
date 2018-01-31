import React, { PureComponent } from 'react'
import {
  arrayOf,
  func,
  oneOf,
  oneOfType,
  number,
  shape,
  string,
} from 'prop-types'
import {
  always,
  call,
  ifElse,
  isEmpty,
  isNil,
  path,
} from 'ramda'
import classNames from 'classnames'

import ThemeConsumer from '../ThemeConsumer'
import TableExpandedItem from './TableExpandedItem'

const consumeTheme = ThemeConsumer('UITable')

const getRenderedItem = ifElse(
  isNil,
  always(null),
  call
)

class TableExpandedRow extends PureComponent {
  constructor (props) {
    super(props)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.renderAction = this.renderAction.bind(this)
    this.renderColumn = this.renderColumn.bind(this)
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
          text={path(column.acessor, data)}
        >
          {getRenderedItem(column.renderer, data)}
        </TableExpandedItem>

      </li>
    )
  }

  renderAction (column, idx) {
    const { index } = this.props
    return (
      <div key={`action_${index}_${idx}`}>
        {column.renderer(index)}
      </div>
    )
  }

  render () {
    const {
      className,
      columns,
      parity,
      theme,
    } = this.props

    const cols = columns.filter(col => !col.isAction).map(this.renderColumn)
    const actions = columns.filter(col => col.isAction).map(this.renderAction)
    return (
      <tr
        className={classNames(className, theme[parity], theme.expandedRow)}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        tabIndex="0"
      >
        <td colSpan="9">
          <div className={theme.expandable}>
            <ul>
              {cols}
            </ul>
            {
              !isEmpty(actions) &&
              <div className={theme.expandableActions}>
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
   * @see [ThemeProvider](#themeprovider) - Theme received from consumeTheme wrapper.
   */
  theme: shape({
    tableRow: string,
    expandable: string,
    even: string,
    odd: string,
  }),
  /**
   * Aditional css classes which can be applyed to the expanded row.
   */
  className: string,
  /**
   * Columns which will provide access to the data received.
   * These columns are the columns which are not shown in the table.
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
   * Set of data native of row data from the table.
   */
  data: shape({}).isRequired,
  /**
   * Row index.
   */
  index: number.isRequired,
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
   * Define the line color
   */
  parity: oneOf(['even', 'odd']),
}

TableExpandedRow.defaultProps = {
  className: '',
  parity: '',
  theme: {},
}

export default consumeTheme(TableExpandedRow)
