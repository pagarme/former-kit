export default [
  {
    key: 'today',
    label: 'today',
    date: () => 0,
  },
  {
    key: 'any-day',
    label: 'any day',
    date: () => null,
  },
  {
    key: 'any-date',
    label: 'any period',
    date: () => null,
  },
  {
    key: 'last',
    label: 'Last:',
    list: [
      {
        key: 'last-7',
        label: '7 days',
        date: () => -7,
      },
      {
        key: 'last-15',
        label: '15 days',
        date: () => -15,
      },
      {
        key: 'last-30',
        label: '30 days',
        date: () => -30,
      },
      {
        key: 'last-60',
        label: '60 days',
        date: () => -60,
      },
    ],
  },
  {
    key: 'next',
    label: 'Next:',
    list: [
      {
        key: 'next-7',
        label: '7 days',
        date: () => 7,
      },
      {
        key: 'next-15',
        label: '15 days',
        date: () => 15,
      },
      {
        key: 'next-30',
        label: '30 days',
        date: () => 30,
      },
      {
        key: 'next-60',
        label: '60 days',
        date: () => 60,
      },
    ],
  },
]
