import moment from 'moment'

export default function normalizeDates (dates) {
  if (!dates) {
    return { start: null, end: null }
  }

  if (moment.isMoment(dates)) {
    return {
      start: dates.startOf('day'),
      end: dates.endOf('day'),
    }
  }

  let normal = {
    start: dates.start || null,
    end: dates.end || null,
  }

  normal = {
    start: dates.start ? moment(normal.start).startOf('day') : null,
    end: dates.end ? moment(normal.end).endOf('day') : null,
  }

  return normal
}

