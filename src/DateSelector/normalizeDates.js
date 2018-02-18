import moment from 'moment'

import { is } from 'ramda'

const isNumber = is(Number)

export default function normalizeDates (dates) {
  if (isNumber(dates)) {
    if (dates === 0) {
      return {
        start: moment().startOf('day'),
        end: moment().add(dates, 'day').endOf('day'),
      }
    }

    if (dates > 0) {
      return {
        start: moment().startOf('day'),
        end: moment().add(dates, 'day').endOf('day'),
      }
    }

    if (dates < 0) {
      return {
        start: moment().add(dates, 'day').startOf('day'),
        end: moment().endOf('day'),
      }
    }
  }

  if (!dates) {
    return { start: null, end: null }
  }

  if (moment.isMoment(dates)) {
    return {
      start: dates.startOf('day'),
      end: dates.endOf('day'),
    }
  }

  const normal = {
    start: null,
    end: null,
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

