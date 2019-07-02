import React, { Component, Fragment } from 'react'

import SegmentedSwitch from '../../src/SegmentedSwitch'
import Table from '../../src/Table'
import style from './style.css'

import getMock from './tableMock'

const addSizeProp = (column, i) => ({
  ...column,
  orderable: false,
  width: i % 2 === 0 ? 80 : 200,
})

const addSameSizeProp = column => ({
  ...column,
  orderable: false,
  width: 120,
})

const options = [
  {
    title: 'Same size columns',
    value: 'noSize',
  },
  {
    title: 'Columns with different sizes',
    value: 'sizedColumns',
  },
]

class TableStateWidthControl extends Component {
  constructor (props) {
    super(props)

    const {
      selectable,
    } = props

    const mock = getMock()
    this.mock = {
      ...mock,
      columns: mock.columns.map(addSizeProp),
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleColumnsToSameWidth = this.handleColumnsToSameWidth.bind(this)
    this.handleColumnsToDistinctsWidth = this.handleColumnsToDistinctsWidth
      .bind(this)

    this.state = {
      columns: this.mock.columns,
      rows: this.mock.rows,
      selectedRows: selectable ? [2] : [],
      value: 'sizedColumns',
    }
  }

  handleColumnsToSameWidth () {
    const { columns } = this.state
    const mock = getMock()

    this.mock = {
      ...mock,
      columns: columns.map(addSameSizeProp),
    }

    this.setState({
      columns: this.mock.columns,
    })
  }

  handleColumnsToDistinctsWidth () {
    const { columns } = this.state

    const mock = getMock()
    this.mock = {
      ...mock,
      columns: columns.map(addSizeProp),
    }

    this.setState({
      columns: this.mock.columns,
    })
  }

  handleChange (value, primaryAction, simple) {
    this.setState({
      value,
    })

    if (value === 'noSize') {
      return this.handleColumnsToSameWidth(primaryAction, simple)
    }

    return this.handleColumnsToDistinctsWidth(primaryAction, simple)
  }

  render () {
    const {
      columns,
      rows,
      selectedRows,
      value,
    } = this.state

    return (
      <Fragment>
        <Table
          className={style.table}
          columns={columns}
          disabled={false}
          maxColumns={7}
          onOrderChange
          rows={rows}
          selectable={false}
          selectedRows={selectedRows}
        />

        <br />
        <SegmentedSwitch
          name="table-test"
          options={options}
          onChange={this.handleChange}
          value={value}
        />
      </Fragment>
    )
  }
}

export default TableStateWidthControl
