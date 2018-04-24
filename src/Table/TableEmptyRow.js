import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UITable')

const TableEmptyRow = ({
  colSpan,
  message,
  theme,
}) => (
  <tr
    className={theme.tableRow}
    tabIndex="0"
  >
    <td
      className={classNames(
        theme.tableItem,
        theme.startAlign
      )}
      colSpan={colSpan}
    >
      <span>{message}</span>
    </td>
  </tr>
)

TableEmptyRow.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    startAlign: PropTypes.string,
    tableItem: PropTypes.string,
    tableRow: PropTypes.string,
  }),
  /**
   * Indicates how many columns a cell should take up.
   */
  colSpan: PropTypes.number.isRequired,
  /**
   * Message which shown when the table row array is empty.
   */
  message: PropTypes.string.isRequired,
}

TableEmptyRow.defaultProps = {
  theme: {},
}

export default consumeTheme(TableEmptyRow)
