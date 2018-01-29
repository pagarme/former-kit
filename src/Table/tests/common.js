import React from 'react'
import { mount } from 'enzyme'
import IconArrowDown from 'react-icons/lib/md/keyboard-arrow-down'
import IconArrowUp from 'react-icons/lib/md/keyboard-arrow-up'
import IconLongArrowDown from 'react-icons/lib/fa/long-arrow-down'
import IconLongArrowUp from 'react-icons/lib/fa/long-arrow-up'
import IconSort from 'react-icons/lib/fa/sort'
import Button from '../../Button'
import Table from '../index'

const columnWithRenderer = {
  title: 'Status',
  renderer: item => (
    <b>
      {item.status}
    </b>
  ),
  acessor: ['status'],
  orderable: true,
}

const onActionButtonClick = jest.fn()

const mock = {
  columns: [
    columnWithRenderer,
    { title: 'Id da transação', acessor: ['id'], orderable: true },
    { title: 'Data da transação', acessor: ['date_created'], orderable: true },
    { title: 'Cpf/Cnpj', acessor: ['document_number'], orderable: true },
    { title: 'Forma de pagamento', acessor: ['payment_method'], orderable: true },
    { title: 'Valor capturado', acessor: ['paid_amount'], orderable: true },
    { title: 'Custo', acessor: ['cost'], orderable: true },
    { title: 'Valor Líquido', acessor: ['amount'], orderable: true },
    { title: 'E-mail', acessor: ['customer', 'email'], orderable: true },
    { title: 'Razão da recusa', acessor: ['refuse_reason'], orderable: true },
    { title: 'Antifraude', acessor: ['antifraud_score'], orderable: true },
    { title: 'Parcelas', acessor: ['installments'], orderable: true },
    { title: 'Nome', acessor: ['customer', 'name'], orderable: true },
    {
      title: 'Bandeira',
      acessor: ['card_brand'],
      orderable: true,
      renderer: item => (
        <p>
          {
            item.card_brand &&
            <span>{item.card_brand}</span>
          }
          {
            !item.card_brand &&
            <span> no data </span>
          }
        </p>
      ),
    },
    { title: 'Link do boleto', acessor: ['link'], orderable: true },
    {
      title: 'Mais detalhes',
      isAction: true,
      orderable: false,
      renderer: () => (
        <Button
          fill="outline"
          onClick={onActionButtonClick}
        >
          Mostar Detalhes
        </Button>
      ),
    },
  ],
  visibleColumnsCount: 7,
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
      card_brand: 'master',
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
      payment_method: 'Cartão de credito',
      refuse_reason: null,
      status: 'Pago',
      status_acronym: 'P',
      status_color: '#57be76',
    },
    {
      antifraud_score: 'Approved',
      card_brand: 'master',
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
      payment_method: 'Cartão de credito extrangeiro',
      refuse_reason: null,
      status: 'Chargeback',
      status_acronym: 'CB',
      status_color: '#e47735',
    },
    {
      amount: 'R$ 600.000,00',
      antifraud_score: null,
      card_brand: 'master',
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
}

const createComponents = ({
  columns = mock.columns,
  visibleColumnsCount = 7,
  expandable = true,
  expandedRows = [],
  orderColumn = 0,
  orderSequence = 'ascending',
  rows = mock.rows,
  selectable = true,
  selectedRows = [],
} = mock) => {
  const onExpandRow = jest.fn()
  const onOrderChange = jest.fn()
  const onSelectRow = jest.fn()
  const onRowClick = jest.fn()
  const stateComponent = mount(
    <Table
      columns={columns}
      expandable={expandable}
      expandedRows={expandedRows}
      maxColumns={visibleColumnsCount}
      onExpandRow={onExpandRow}
      onOrderChange={onOrderChange}
      onRowClick={onRowClick}
      onSelectRow={onSelectRow}
      orderColumn={orderColumn}
      orderSequence={orderSequence}
      rows={rows}
      selectable={selectable}
      selectedRows={selectedRows}
      icons={{
        expand: <IconArrowDown />,
        collapse: <IconArrowUp />,
        descending: <IconLongArrowDown />,
        ascending: <IconLongArrowUp />,
        orderable: <IconSort />,
      }}
    />
  )

  const component = stateComponent.find(Table).first()

  return {
    columns,
    component,
    onActionButtonClick,
    onExpandRow,
    onOrderChange,
    onRowClick,
    onSelectRow,
    rows,
    stateComponent,
    visibleColumnsCount,
  }
}

export {
  columnWithRenderer,
  createComponents,
}
