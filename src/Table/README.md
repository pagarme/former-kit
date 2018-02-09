Simple Table examples

First, let's create an wrapper component to handle
with state of the Table.
``` jsx static
const { equals } = require('ramda')

const isAscending = equals('ascending')

const rowSort = acessor =>
  sortBy(compose(toLower, defaultTo(''), path(acessor)))

const getSort = (acessor, order) => (
  isAscending(order) ?
    rowSort(acessor) :
    pipe(rowSort(acessor), reverse)
)

const getMock = detailsClick => ({
  columns: [
    {
      title: 'Status',
      renderer: item => (
        <div>
          <Legend
            color={item.status_color}
            acronym={item.status_acronym}
            hideLabel
          >
            {item.status}
          </Legend>
        </div>
      ),
      acessor: ['status'],
      orderable: true,
    },
    { title: 'Transation ID', acessor: ['id'], orderable: true },
    { title: 'Date', acessor: ['date_created'], orderable: true },
    {
      title: 'Details',
      isAction: true,
      orderable: false,
      renderer: index => (
        <Button
          fill="outline"
          onClick={() => detailsClick(index)}
        >
          Details
        </Button>
      ),
    },
  ],
  rows: [
    {
      antifraud_score: null,
      card_brand: null,
      cost: 'R$ 100.000,00',
      customer: {
        email: null,
        name: null,
      },
      date_created: '23/09/2017 - 14:15h',
      document_number: '67.484.928/0001-60',
      id: '2229597000',
      installments: 1,
      link: 'link maroto do boleto',
      paid_amount: 'R$ 999.999.999,00',
      amount: 'R$ 999.999.999,00',
      payment_method: 'Boleto',
      refuse_reason: null,
      status: 'Boleto pago com valor inferior',
      status_acronym: 'BPVI',
      status_color: '#244d85',
    },
    {
      antifraud_score: 'Approved',
      card_brand: 'mastercard',
      cost: 'R$ 12.000,00',
      paid_amount: 'R$ 100.000,00',
      customer: {
        email: 'null@undefined.com',
        name: 'null da undefined de NaN',
      },
      date_created: '23/09/2017 - 15:15h',
      document_number: '67.484.928/0001-60',
      id: '2229597001',
      installments: '4X',
      link: null,
      amount: 'R$ 400.000,00',
      payment_method: 'Cartão de crédito',
      refuse_reason: null,
      status: 'Pago',
      status_acronym: 'P',
      status_color: '#57be76',
    },
    {
      antifraud_score: 'Approved',
      card_brand: 'visa',
      cost: 'R$ 13.000,00',
      paid_amount: 'R$ 100.000,00',
      customer: {
        email: 'null@undefined.com',
        name: 'null da undefined de NaN',
      },
      date_created: '23/09/2017 - 16:15h',
      document_number: '67.484.928/0001-60',
      id: '2229597003',
      installments: '5X',
      link: null,
      amount: 'R$ 500.000,00',
      payment_method: 'Cartão de crédito estrangeiro',
      refuse_reason: null,
      status: 'Chargeback',
      status_acronym: 'CB',
      status_color: '#e47735',
    },
    {
      amount: 'R$ 600.000,00',
      antifraud_score: null,
      card_brand: 'visa',
      cost: 'R$ 14.000,00',
      customer: {
        email: 'null@undefined.com',
        name: 'null da undefined de NaN',
      },
      date_created: null,
      document_number: null,
      id: '2229597004',
      installments: '6X',
      link: null,
      paid_amount: null,
      payment_method: null,
      refuse_reason: null,
      status: 'Processing',
      status_acronym: 'PR',
      status_color: '#951e3c',
    },
  ],
})

const getRowsSort = (rows, columns) =>
  (orderColumn, order) => {
    const referenceColumn = columns[orderColumn]
    const referenceAcessor = referenceColumn.acessor
    const sort = getSort(referenceAcessor, order)
    return sort(rows)
  }

class TableState extends React.Component {
  constructor (props) {
    super(props)

    this.handleDetailsClick = this.handleDetailsClick.bind(this)
    this.handleExpandRow = this.handleExpandRow.bind(this)
    this.handleOrderChange = this.handleOrderChange.bind(this)
    this.handleRowClick = this.handleRowClick.bind(this)
    this.handleSelectRow = this.handleSelectRow.bind(this)
    this.getColumns = this.getColumns.bind(this)
    this.getColumnsWithPrimaryAction = this.getColumnsWithPrimaryAction.bind(this)
    this.mock = getMock(this.handleDetailsClick)
    this.state = {
      orderColumn: 0,
      order: 'ascending',
      rows: this.mock.rows,
      columns: this.getColumns(props.primaryAction),
      selectedRows: [],
      expandedRows: [],
      detailsClicks: 0,
    }
  }

  getColumns (primaryActions) {
    return (
      primaryActions ?
        this.getColumnsWithPrimaryAction() :
        this.mock.columns
    )
  }

  getColumnsWithPrimaryAction (columnCount = 7) {
    const cols = this.mock.columns.map(col => col)
    const actionIndex = findIndex(a => (a.isAction), cols)
    const action = cols.splice(actionIndex, 1)[0]
    cols.splice((columnCount - 1), 1, action)
    return cols
  }

  handleOrderChange (index, order) {
    const { rows, columns } = this.state
    const sortByOrderColumn = getRowsSort(rows, columns)
    const sortedRows = sortByOrderColumn(index, order)
    this.setState({
      orderColumn: index,
      order,
      rows: sortedRows,
      selectedRows: [],
      expandedRows: [],
    })
  }

  handleSelectRow (selectedRows) {
    this.setState({
      selectedRows,
    })
  }

  handleExpandRow (expandedRows) {
    this.setState({
      expandedRows,
      detailsClicks: 0,
    })
  }

  handleDetailsClick () {
    const clicks = 1 + this.state.detailsClicks
    this.setState({
      detailsClicks: clicks,
    })
  }

  handleRowClick (clickedRowIndex) {
    this.setState({
      clickedRowIndex,
    })
  }


  render () {
    const {
      clickableRow,
      selectable,
      expandable,
    } = this.props
    const {
      clickedRowIndex,
      columns,
      detailsClicks,
      expandedRows,
      order,
      orderColumn,
      rows,
      selectedRows,
    } = this.state

    const onRowClick = clickableRow ? this.handleRowClick : null

    return (
      <div>
        <Table
          columns={columns}
          rows={rows}
          selectable={selectable}
          expandable={expandable}
          selectedRows={selectedRows}
          expandedRows={expandedRows}
          onOrderChange={this.handleOrderChange}
          onSelectRow={this.handleSelectRow}
          orderSequence={order}
          orderColumn={orderColumn}
          onExpandRow={this.handleExpandRow}
          onRowClick={onRowClick}
        />
      </div>
    )
  }
}
```

Simple Table
``` jsx
const TableState = require('./examples/TableState').default;

<TableState
  clickableRow
/>
```

Table expandable

``` jsx
const TableState = require('./examples/TableState').default;

<TableState
  clickableRow
  expandable
/>
```

``` jsx
const TableState = require('./examples/TableState').default;

<TableState
  primaryAction
/>
```
