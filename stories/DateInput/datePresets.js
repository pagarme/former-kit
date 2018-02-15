export default [
  {
    title: 'Last:',
    items: [
      {
        key: 'last-7',
        title: '7 days',
        date: () => -7,
      },
      {
        key: 'last-15',
        title: '15 days',
        date: () => -15,
      },
      {
        key: 'last-30',
        title: '30 days',
        date: () => -30,
      },
      {
        key: 'last-60',
        title: '60 days',
        date: () => -60,
      },
    ],
  },
]
