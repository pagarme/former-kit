import moment from 'moment'

import { is } from 'ramda'

const isNumber = is(Number)

export default function normalizeDates (dates) {
  if (isNumber(dates)) {
    if (dates === 0) {
      return {
        end: moment().add(dates, 'day').endOf('day'),
        start: moment().startOf('day'),
      }
    }

    if (dates > 0) {
      return {
        end: moment().add(dates, 'day').endOf('day'),
        start: moment().startOf('day'),
      }
    }

    if (dates < 0) {
      return {
        end: moment().endOf('day'),
        start: moment().add(dates, 'day').startOf('day'),
      }
    }
  }

  if (!dates) {
    return { end: null, start: null }
  }

  if (moment.isMoment(dates)) {
    return {
      end: dates.endOf('day'),
      start: dates.startOf('day'),
    }
  }

  const normal = {
    end: null,
    start: null,
  }

  if (dates.start) {
    normal.start = dates.start.startOf('day')
  }

  if (dates.end) {
    normal.end = dates.end.endOf('day')
  }

  if (dates.startDate) {
    normal.start = dates.startDate.startOf('day')
  }

  if (dates.endDate) {
    normal.end = dates.endDate.endOf('day')
  }

  return normal
}

