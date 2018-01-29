import moment from 'moment'

import {
  invoker,
  curry,
} from 'ramda'


const DATE_MASK = 'L'

const formatMoment = invoker(1, 'format')(DATE_MASK)
const parseMoment = date => moment(date, DATE_MASK, true)

export const textToMoment = ({ start, end }) => ({
  start: start ? parseMoment(start).startOf('day') : null,
  end: end ? parseMoment(end).endOf('day') : null,
})

export const momentToText = ({ start, end }) => ({
  start: start ? start.format(DATE_MASK) : '',
  end: end ? end.format(DATE_MASK) : '',
})

export const hasDifferentEnd = (dates) => {
  if (dates.start === dates.end) {
    return false
  }

  const { start, end } = textToMoment(dates)

  if (start === end) {
    return false
  }

  if (start && start.isSame(end, 'day')) {
    return false
  }

  const now = moment()

  if (now.isSame(start, 'day') && now.isSame(end, 'day')) {
    return false
  }

  return true
}

export const clampRange = curry((limits, date) => {
  if (date === null) {
    return null
  }

  const momentDate = parseMoment(date)

  if (date && limits.lower && momentDate.isBefore(limits.lower)) {
    return formatMoment(limits.lower)
  }

  if (date && limits.upper && momentDate.isAfter(limits.upper)) {
    return formatMoment(limits.upper)
  }

  return formatMoment(momentDate)
})

export const validateRange = (limits, dates) => {
  const { start, end } = textToMoment(dates)
  const { upper, lower } = limits

  let isValidStart = start === null || (start && start.isValid())
  let isValidEnd = end === null || (end && end.isValid())

  if (start) {
    isValidStart = isValidStart
      && (!lower || !start.isBefore(lower))
      && (!upper || !start.isAfter(upper))
  }

  if (end) {
    isValidEnd = isValidEnd
      && (!lower || !end.isBefore(lower))
      && (!upper || !end.isAfter(upper))
  }

  if (start && end && start.isAfter(end)) {
    isValidStart = false
    isValidEnd = false
  }

  return { isValidStart, isValidEnd }
}

export const inputDateMask = moment()
  .format(DATE_MASK).replace(/\d/g, '1')
