export default [
  {
    key: 'today',
    label: 'today',
    mode: 'single',
    date: () => 0,
  },
  {
    key: 'any-date',
    label: 'any date',
    mode: 'period',
    date: () => null,
  },
  {
    key: 'single-day',
    label: 'single day',
    mode: 'single',
    date: () => null,
  },
  {
    key: 'last',
    label: 'Last:',
    list: [
      {
        key: 'last-7',
        label: '7 days',
        mode: 'period',
        date: () => -7,
      },
      {
        key: 'last-15',
        label: '15 days',
        mode: 'period',
        date: () => -15,
      },
      {
        key: 'last-30',
        label: '30 days',
        mode: 'period',
        date: () => -30,
      },
      {
        key: 'last-60',
        label: '60 days',
        mode: 'period',
        date: () => -60,
      },
    ],
  },
  {
    key: 'next',
    label: 'next:',
    list: [
      {
        key: 'next-7',
        label: '7 days',
        mode: 'period',
        date: () => 7,
      },
      {
        key: 'next-15',
        label: '15 days',
        mode: 'period',
        date: () => 15,
      },
      {
        key: 'next-30',
        label: '30 days',
        mode: 'period',
        date: () => 30,
      },
      {
        key: 'next-60',
        label: '60 days',
        mode: 'period',
        date: () => 60,
      },
    ],
  },
]
