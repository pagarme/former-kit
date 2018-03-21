import React from 'react'
import {
  always,
  both,
  complement,
  equals,
  ifElse,
  is,
  map,
  pipe,
  sum,
  unapply,
  unless,
} from 'ramda'
import IconVisa from 'emblematic-icons/svg/VisaCard16.svg'
import IconMaster from 'emblematic-icons/svg/MasterCard16.svg'
import Legend from '../../src/Legend'
import Button from '../../src/Button'
import TableEmptyItem from '../../src/Table/TableEmptyItem'
import style from './style.css'

import currencyFormatter from '../../src/Table/examples/currencyFormatter'

const isVisa = equals('visa')

const getBrandIcon = ifElse(
  isVisa,
  () => <IconVisa className={style.cardBrand} />,
  () => <IconMaster className={style.cardBrand} />
)

const getNumber = unless(
  both(is(Number), complement(Number.isNaN)),
  always(0)
)

const sumParameters = unapply(pipe(map(getNumber), sum))

const getMock = (detailsClick, disabled) => ({
  columns: [
    {
      accessor: ['status'],
      align: 'center',
      orderable: true,
      renderer: item => (
        <div className={style.centralizedItem}>
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

      aggregator: null,
      aggregationRenderer: null,
      aggregationTitle: 'Total',
    },
    {
      accessor: ['id'],
      align: 'start',
      orderable: true,
      title: 'Transaction ID',

      aggregator: null,
      aggregationRenderer: null,
      aggregationTitle: null,
    },
    {
      accessor: ['date_created'],
      align: 'center',
      orderable: true,
      title: 'Date',

      aggregator: null,
      aggregationRenderer: null,
      aggregationTitle: null,
    },
    {
      accessor: ['payment_method'],
      align: 'center',
      orderable: true,
      title: 'Payment Method',

      aggregator: null,
      aggregationRenderer: null,
      aggregationTitle: null,
    },
    {
      accessor: ['paid_amount'],
      align: 'end',
      orderable: true,
      title: 'Paid Amount',
      // eslint-disable-next-line camelcase
      renderer: ({ paid_amount = 0 }) => currencyFormatter(paid_amount),
      aggregator: sumParameters,
      aggregationRenderer: currencyFormatter,
      aggregationTitle: null,
    },
    {
      accessor: ['cost'],
      align: 'end',
      orderable: true,
      title: 'Cost',

      renderer: ({ cost = 0 }) => currencyFormatter(cost),
      aggregator: sumParameters,
      aggregationRenderer: currencyFormatter,
    },
    {
      accessor: ['amount'],
      align: 'end',
      orderable: true,
      title: 'Amount',

      renderer: ({ amount = 0 }) => currencyFormatter(amount),
      aggregator: sumParameters,
      aggregationRenderer: currencyFormatter,
      aggregationTitle: null,
    },
    {
      accessor: ['customer', 'email'],
      align: 'center',
      orderable: true,
      title: 'E-mail',

      aggregator: null,
      aggregationRenderer: null,
      aggregationTitle: null,
    },
    {
      accessor: ['antifraud_score'],
      align: 'center',
      orderable: true,
      title: 'Antifraud Score',

      aggregator: null,
      aggregationRenderer: null,
      aggregationTitle: null,
    },
    {
      accessor: ['installments'],
      align: 'center',
      orderable: true,
      title: 'Installments',

      aggregator: null,
      aggregationRenderer: null,
      aggregationTitle: null,
    },
    {
      accessor: ['customer', 'name'],
      align: 'start',
      orderable: true,
      title: 'Name',

      aggregator: null,
      aggregationRenderer: null,
      aggregationTitle: null,
    },
    {
      accessor: ['card_brand'],
      align: 'center',
      orderable: true,
      renderer: item => (
        <div
          className={style.centralizedItem}
          title={item.card_brand}
        >
          {
            item.card_brand &&
            <span className={style.capitalize}>
              {getBrandIcon(item.card_brand)}
              {item.card_brand}
            </span>
          }
          {
            !item.card_brand &&
            <TableEmptyItem className={style.empty} />
          }
        </div>
      ),
      title: 'Card brand',

      aggregator: null,
      aggregationRenderer: null,
      aggregationTitle: null,
    },
    {
      accessor: ['link'],
      align: 'start',
      orderable: true,
      title: 'Boleto link',

      aggregator: null,
      aggregationRenderer: null,
      aggregationTitle: null,
    },
    {
      align: 'center',
      isAction: true,
      orderable: false,
      renderer: index => (
        <Button
          fill="outline"
          onClick={() => detailsClick(index)}
          disabled={disabled}
        >
          Show details
        </Button>
      ),
      title: 'Details',

      aggregator: null,
      aggregationRenderer: null,
      aggregationTitle: null,
    },
  ],
  rows: [
    {
      antifraud_score: null,
      card_brand: null,
      cost: 10000000,
      customer: {
        email: null,
        name: null,
      },
      date_created: '23/09/2017 - 14:15h',
      document_number: '67.484.928/0001-60',
      id: '2229597000',
      installments: 1,
      link: 'boleto link',
      paid_amount: 99999999900,
      amount: 99999999900,
      payment_method: 'Boleto',
      refuse_reason: null,
      status: 'Boleto paid with inferior value',
      status_acronym: 'BPIV',
      status_color: '#244d85',
    },
    {
      antifraud_score: 'Approved',
      card_brand: 'mastercard',
      cost: 1200000,
      paid_amount: 10000000,
      customer: {
        email: 'null@undefined.com',
        name: 'undefined is not a function',
      },
      date_created: '23/09/2017 - 15:15h',
      document_number: '67.484.928/0001-60',
      id: '2229597001',
      installments: '4X',
      link: null,
      amount: 40000000,
      payment_method: 'Credit card',
      refuse_reason: null,
      status: 'Pago',
      status_acronym: 'P',
      status_color: '#57be76',
    },
    {
      antifraud_score: 'Approved',
      card_brand: 'visa',
      cost: 1300000,
      paid_amount: 10000000,
      customer: {
        email: 'null@undefined.com',
        name: 'null of undefined of NaN',
      },
      date_created: '23/09/2017 - 16:15h',
      document_number: '67.484.928/0001-60',
      id: '2229597003',
      installments: '5X',
      link: null,
      amount: 50000000,
      payment_method: 'Credit card',
      refuse_reason: null,
      status: 'Chargeback',
      status_acronym: 'CB',
      status_color: '#e47735',
    },
    {
      amount: 60000000,
      antifraud_score: null,
      card_brand: 'visa',
      cost: 1400000,
      customer: {
        email: 'null@undefined.com',
        name: 'Cannot read property "name" of undefined',
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
