import React from 'react'
import Table from '../index'
import Button from '../../Button'

const columns = [
  {
    accessor: ['name'],
    title: 'Name',
  },
  {
    accessor: ['bank'],
    title: 'Bank',
  },
  {
    accessor: ['agency'],
    align: 'end',
    title: 'Agency',
  },
  {
    accessor: ['account'],
    align: 'end',
    title: 'Account',
  },
]

const rows = [
  {
    name: 'Jhon Doe',
    bank_code: '341',
    agency: '0113',
    account: '99099-9',
  },
]

class TableLoader extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: false,
    }

    this.toggleLoader = this.toggleLoader.bind(this)
  }

  toggleLoader () {
    this.setState({ loading: true })
    setTimeout(() => this.setState({ loading: false }), 2000)
  }

  render () {
    return (
      <React.Fragment>
        <Table
          columns={columns}
          loading={this.state.loading}
          rows={rows}
        />
        <br />
        <Button
          onClick={this.toggleLoader}
        >
          load
        </Button>
      </React.Fragment>
    )
  }
}

export default TableLoader
