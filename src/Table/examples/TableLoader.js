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
    account: '99099-9',
    agency: '0113',
    bank_code: '341',
    name: 'Jhon Doe',
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
    const { loading } = this.state
    return (
      <React.Fragment>
        <Table
          columns={columns}
          loading={loading}
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
