import moment from 'moment'

import normalizeDates from './normalizeDates'

export default function calculatePreset (dates) {
  const { start, end } = normalizeDates(dates)

  const now = moment()

  if (now.isSame(start, 'day') && now.isSame(end, 'day')) {
    return 'today'
  }

  if (start === end) {
    return 'single'
  }

  if (start && start instanceof moment && start.isSame(end, 'day')) {
    return 'single'
  }

  return 'range'
}

