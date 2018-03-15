import React from 'react'
import Legend from '../../Legend/'
import Button from '../../Button'

const getMock = detailsClick => ({
  columns: [
    {
      accessor: ['status'],
      align: 'center',
      orderable: true,
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
      title: 'Status',
    },
    {
      accessor: ['id'],
      align: 'start',
      orderable: true,
      title: 'Transaction ID',
    },
    {
      accessor: ['date_created'],
      align: 'center',
      orderable: true,
      title: 'Date',
    },
    {
      accessor: ['payment_method'],
      align: 'center',
      orderable: true,
      title: 'Payment Method',
    },
    {
      accessor: ['paid_amount'],
      align: 'end',
      orderable: true,
      title: 'Paid Amount',
    },
    {
      accessor: ['cost'],
      align: 'end',
      orderable: true,
      title: 'Cost',
    },
    {
      accessor: ['amount'],
      align: 'end',
      orderable: true,
      title: 'Amount',
    },
    {
      accessor: ['customer', 'email'],
      align: 'center',
      orderable: true,
      title: 'E-mail',
    },
    {
      accessor: ['antifraud_score'],
      align: 'center',
      orderable: true,
      title: 'Antifraud Score',
    },
    {
      accessor: ['installments'],
      align: 'center',
      orderable: true,
      title: 'Installments',
    },
    {
      accessor: ['customer', 'name'],
      align: 'start',
      orderable: true,
      title: 'Name',
    },
    {
      align: 'center',
      title: 'Details',
      isAction: true,
      orderable: false,
      renderer: index => (
        <Button
          fill="outline"
          onClick={() => detailsClick(index)}
        >
          Mostar Detalhes
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

export default getMock
