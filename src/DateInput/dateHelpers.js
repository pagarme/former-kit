import moment from 'moment'

const DATE_MASK = 'L'

const parseMoment = date => moment(date, DATE_MASK, true)

export const textToMoment = ({ end, start }) => ({
  end: end ? parseMoment(end).endOf('day') : null,
  start: start ? parseMoment(start).startOf('day') : null,
})

export const momentToText = ({ end, start }) => ({
  end: end ? end.format(DATE_MASK) : '',
  start: start ? start.format(DATE_MASK) : '',
})

export const hasDifferentEnd = (dates) => {
  if (dates.start === dates.end) {
    return false
  }

  const { end, start } = textToMoment(dates)

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

export const validateRange = (limits, dates) => {
  const { end, start } = textToMoment(dates)
  const { lower, upper } = limits

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

  return { isValidEnd, isValidStart }
}
// eslint-disable-next-line
export const validateDate = ({ upper, lower }) => (date) => {
  const isValidDate = date === null || (date && date.isValid())
  if (upper && lower && date) {
    return isValidDate
      && (!lower || !date.isBefore(lower))
      && (!upper || !date.isAfter(upper))
  }

  return isValidDate
}

export const isValidMoment = date => date && date.isValid()

export const inputDateMask = () => moment()
  .format(DATE_MASK).replace(/\d/g, '1')
