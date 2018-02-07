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

const getMock = detailsClick => ({
  columns: [
    {
      title: 'Status',
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
      accessor: ['status'],
      orderable: true,
    },
    { title: 'Id da transação', accessor: ['id'], orderable: true },
    { title: 'Data da transação', accessor: ['date_created'], orderable: true },
    { title: 'Cpf/Cnpj', accessor: ['document_number'], orderable: true },
    { title: 'Forma de pagamento', accessor: ['payment_method'], orderable: true },
    { title: 'Valor capturado', accessor: ['paid_amount'], orderable: true },
    { title: 'Custo', accessor: ['cost'], orderable: true },
    { title: 'Valor Líquido', accessor: ['amount'], orderable: true },
    { title: 'E-mail', accessor: ['customer', 'email'], orderable: true },
    { title: 'Razão da recusa', accessor: ['refuse_reason'], orderable: true },
    { title: 'Antifraude', accessor: ['antifraud_score'], orderable: true },
    { title: 'Parcelas', accessor: ['installments'], orderable: true },
    { title: 'Nome', accessor: ['customer', 'name'], orderable: true },
    {
      title: 'Bandeira',
      accessor: ['card_brand'],
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
    },
    { title: 'Link do boleto', accessor: ['link'], orderable: true },
    {
      title: 'Mais detalhes',
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
