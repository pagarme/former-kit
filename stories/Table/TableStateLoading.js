import React, { Component, Fragment } from 'react'
import { action } from '@storybook/addon-actions'

import Button from '../../src/Button'
import Table from '../../src/Table'

const columns = [
  {
    accessor: ['name'],
    title: 'Name',
  },
  {
    accessor: ['bank_code'],
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
    account: '33064-1',
    agency: '0113',
    bank_code: '341',
    name: 'Wallace Batista Oliveira',
  },
  {
    account: '33064-1',
    agency: '0113',
    bank_code: '341',
    name: 'Deives Carlão',
  },
]

const actionLoader = action('is loading')

class TableStateLoading extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: false,
    }

    this.handleLoader = this.handleLoader.bind(this)
  }

  handleLoader () {
    this.setState({ loading: true })
    actionLoader(true)

    setTimeout(() => {
      this.setState({ loading: false })
      actionLoader(false)
    }, 2000)
  }

  render () {
    const { loading } = this.state

    return (
      <Fragment>
        <h2>Without loaderRenderer</h2>
        <Table
          columns={columns}
          loading={loading}
          rows={rows}
        />

        <h2>With loaderRenderer</h2>
        <Table
          columns={columns}
          loading={loading}
          loaderRenderer={<span>look ma, without hands</span>}
          rows={rows}
        />

        <br />
        <Button
          disabled={loading}
          onClick={this.handleLoader}
        >
          load
        </Button>
      </Fragment>
    )
  }
}

export default TableStateLoading
