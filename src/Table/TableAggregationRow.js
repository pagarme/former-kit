import React, { PureComponent } from 'react'
import {
  arrayOf,
  bool,
  func,
  number,
  object,
  oneOf,
  oneOfType,
  shape,
  string,
} from 'prop-types'
import {
  always,
  complement,
  ifElse,
  isNil,
  join,
  prop,
  propSatisfies,
} from 'ramda'
import classNames from 'classnames'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UITable')

const hasAggregator = propSatisfies(complement(isNil), 'aggregator')

const hasAggregationRenderer = propSatisfies(complement(isNil), 'aggregationRenderer')

const getRenderer = ifElse(
  hasAggregationRenderer,
  prop('aggregationRenderer'),
  always(null)
)

const hasAggregationTitle = propSatisfies(complement(isNil), 'aggregationTitle')

class TableAggregationRow extends PureComponent {
  constructor () {
    super()
    this.renderCell = this.renderCell.bind(this)
    this.renderCells = this.renderCells.bind(this)
  }

  renderCell (total, index) {
    const { columns, theme } = this.props
    const column = columns[index]
    const key = `${join('_', column.accessor)}_${index}`
    const renderer = getRenderer(column)

    if (hasAggregationTitle(column)) {
      return (
        <td
          key={key}
          className={classNames(
            theme[`${column.align}Align`],
            theme.tableItem,
            theme.footerCell,
            theme.titleFooterCell
          )}
        >
          {prop('aggregationTitle', column)}
        </td>
      )
    }

    if (hasAggregator(column)) {
      return (
        <td
          key={key}
          className={classNames(
            theme[`${column.align}Align`],
            theme.footerCell,
            theme.tableItem
          )}
        >
          { renderer ? renderer(total) : total }
        </td>
      )
    }

    return (
      <td
        key={key}
        className={theme.tableItem}
      />
    )
  }

  renderCells () {
    return this.props.totals.map(this.renderCell)
  }

  render () {
    const {
      className,
      parity,
      theme,
    } = this.props

    const tableRow = classNames(
      theme[parity],
      className
    )

    return (
      <tr className={tableRow}>
        { this.renderCells() }
      </tr>
    )
  }
}

TableAggregationRow.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: shape({
    footer: string,
    even: string,
    odd: string,
  }),
  /**
   * Additional CSS classes which can be applied to the expanded row.
   */
  className: string,
  /**
   * Columns which will provide access to the data received in the rows.
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
     * It defines the cell content alignment.
     */
    align: oneOf(['center', 'start', 'end']),
    /**
     * It identifies if it's an action column.
     */
    isAction: bool,
    /**
     * A custom function which will receive the row data object and should return
     * a React element to be rendered in each cell bound to this column.
     * @param {object} row - all row data
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
     * @param {object} row - all row data
     */
    aggregationRenderer: func,
    /**
     * Text which will be used as title in the footer total row, when this prop is received
     * the aggregator and aggregationRenderer props are ignored.
     */
    aggregationTitle: string,
  })).isRequired,
  /**
   * It defines the line color.
   */
  parity: oneOf(['even', 'odd']),
  /**
   * Array of aggregated data which will be rendered by renderer functions
   * or directly in the aggregation row
   */
  totals: oneOfType([arrayOf(object), arrayOf(number)]).isRequired,
}

TableAggregationRow.defaultProps = {
  className: '',
  parity: 'even',
  theme: {},
}

export default consumeTheme(TableAggregationRow)
