import moment from 'moment'

export default function normalizeDates (dates) {
  if (!dates) {
    return { end: null, start: null }
  }

  if (moment.isMoment(dates)) {
    return {
      end: dates.endOf('day'),
      start: dates.startOf('day'),
    }
  }

  let normal = {
    end: dates.end || null,
    start: dates.start || null,
  }

  normal = {
    end: dates.end ? moment(normal.end).endOf('day') : null,
    start: dates.start ? moment(normal.start).startOf('day') : null,
  }

  return normal
}

