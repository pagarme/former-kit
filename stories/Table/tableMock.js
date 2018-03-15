import React from 'react'
import {
  equals,
  ifElse,
} from 'ramda'
import IconVisa from 'emblematic-icons/svg/VisaCard16.svg'
import IconMaster from 'emblematic-icons/svg/MasterCard16.svg'
import Legend from '../../src/Legend'
import Button from '../../src/Button'
import TableEmptyItem from '../../src/Table/TableEmptyItem'
import style from './style.css'

const isVisa = equals('visa')

const getBrandIcon = ifElse(
  isVisa,
  () => <IconVisa className={style.cardBrand} />,
  () => <IconMaster className={style.cardBrand} />
)

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
    },
    {
      accessor: ['link'],
      align: 'start',
      orderable: true,
      title: 'Boleto link',
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
      link: 'boleto link',
      paid_amount: 'R$ 999.999.999,00',
      amount: 'R$ 999.999.999,00',
      payment_method: 'Boleto',
      refuse_reason: null,
      status: 'Boleto paid with inferior value',
      status_acronym: 'BPIV',
      status_color: '#244d85',
    },
    {
      antifraud_score: 'Approved',
      card_brand: 'mastercard',
      cost: 'R$ 12.000,00',
      paid_amount: 'R$ 100.000,00',
      customer: {
        email: 'null@undefined.com',
        name: 'null of undefined of NaN',
      },
      date_created: '23/09/2017 - 15:15h',
      document_number: '67.484.928/0001-60',
      id: '2229597001',
      installments: '4X',
      link: null,
      amount: 'R$ 400.000,00',
      payment_method: 'Credit card',
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
        name: 'null of undefined of NaN',
      },
      date_created: '23/09/2017 - 16:15h',
      document_number: '67.484.928/0001-60',
      id: '2229597003',
      installments: '5X',
      link: null,
      amount: 'R$ 500.000,00',
      payment_method: 'Credit card',
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
        name: 'null of undefined of NaN',
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
