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
  has,
  path,
  anyPass,
  isEmpty,
  isNil,
} from 'ramda'
import classNames from 'classnames'
import shortid from 'shortid'

import Button from '../Button'
import Checkbox from '../Checkbox'
import ThemeConsumer from '../ThemeConsumer'
import TableEmptyItem from './TableEmptyItem'

const isNilOrEmpty = anyPass([isEmpty, isNil])

const consumeTheme = ThemeConsumer('UITable')

const hasRenderer = has('renderer')

const renderCell = (column, data, key, theme) => {
  const emptyCell = (
    <td
      key={key}
      className={theme.tableBodyItem}
    >
      <TableEmptyItem />
    </td>
  )

  if (hasRenderer(column)) {
    const rendererData = column.renderer(data)

    if (isNilOrEmpty(rendererData)) {
      return emptyCell
    }

    return (
      <td
        key={key}
        className={
          classNames(
            theme.tableBodyItem,
            {
              [theme.unselectable]: column.isAction,
            }
          )
        }
      >
        {rendererData}
      </td>
    )
  }

  const columnData = path(column.accessor, data)
  if (columnData) {
    return (
      <td
        key={key}
        className={theme.tableBodyItem}
      >
        {columnData}
      </td>
    )
  }

  return emptyCell
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
      }
    )

    const lineIndex = `line_${index}`

    return (
      <tr
        className={tableRow}
        onClick={this.handleClick}
        tabIndex="0"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {
          selectable &&
          <td className={theme.check}>
            <Checkbox
              name={lineIndex}
              id={this.checkboxId}
              value={`${index}`}
              label=""
              onChange={this.handleSelect}
              checked={selected}
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
              type="button"
              fill="outline"
              size="tiny"
              relevance="low"
              onClick={this.handleExpand}
              icon={this.getArrowIcon(expanded)}
            />
          </td>
        }
      </tr>
    )
  }
}

TableRow.propTypes = {
  theme: shape({
    even: string,
    odd: string,
    check: string,
    status: string,
    open: string,
  }),
  className: string,
  clickable: bool,
  columns: arrayOf(shape({
    title: string.isRequired,
    accessor: oneOfType([
      string,
      arrayOf(string),
    ]),
    renderer: func,
  })).isRequired,
  data: shape({}).isRequired,
  expanded: bool,
  expandable: bool,
  icons: shape({
    collapse: element,
    expand: element,
  }),
  onClick: func,
  onExpand: func,
  onMouseEnter: func,
  onMouseLeave: func,
  onSelect: func,
  selected: bool,
  selectable: bool,
  parity: oneOf(['even', 'odd']),
  index: number.isRequired,
}

TableRow.defaultProps = {
  className: '',
  clickable: false,
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
