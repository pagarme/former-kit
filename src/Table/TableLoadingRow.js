import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UITable')

const TableLoadingRow = ({
  colSpan,
  theme,
  renderer,
}) => (
  <tr
    className={theme.tableRow}
    tabIndex="0"
  >
    <td
      className={classnames(
        theme.tableItem,
        theme.startAlign
      )}
      colSpan={colSpan}
    >
      {renderer}
    </td>
  </tr>
)

TableLoadingRow.propTypes = {
  /**
   * Indicates how many columns a cell should take up.
   */
  colSpan: PropTypes.number.isRequired,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    startAlign: PropTypes.string,
    tableItem: PropTypes.string,
    tableRow: PropTypes.string,
  }),
  /**
   * The loader renderer.
   */
  renderer: PropTypes.node,
}

TableLoadingRow.defaultProps = {
  theme: {},
  renderer: 'loading...',
}

export default consumeTheme(TableLoadingRow)
