import React, { PureComponent } from 'react'
import {
  arrayOf,
  func,
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
import { themr } from 'react-css-themr'
import classNames from 'classnames'
import TableExpandedItem from './TableExpandedItem'

const applyThemr = themr('UITable')

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
  theme: shape({
    tableRow: string,
    expandable: string,
    even: string,
    odd: string,
  }),
  className: string,
  columns: arrayOf(shape({
    title: string.isRequired,
    acessor: oneOfType([
      string,
      arrayOf(string),
    ]),
    renderer: func,
  })).isRequired,
  data: shape({}).isRequired,
  index: number.isRequired,
  onMouseEnter: func.isRequired,
  onMouseLeave: func.isRequired,
  parity: string,
}

TableExpandedRow.defaultProps = {
  className: '',
  onExpandableButtonClick: null,
  parity: '',
  theme: {},
}

export default applyThemr(TableExpandedRow)
