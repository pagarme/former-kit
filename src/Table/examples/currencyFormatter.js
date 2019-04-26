import {
  __,
  always,
  divide,
  ifElse,
  isNil,
  pipe,
} from 'ramda'
import Intl from 'intl'
import 'intl/locale-data/jsonp/pt'

const formatter = new Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  style: 'currency',
})

const currency = ifElse(
  isNil,
  always(null),
  pipe(Number, divide(__, 100), formatter.format)
)

export default currency
