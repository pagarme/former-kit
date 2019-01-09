const fade = {
  springOptions: {
    damping: 30,
    precision: 0.01,
    stiffness: 300,
  },
  atEnter: {
    opacity: 0.3,
  },
  atActive: {
    opacity: 1,
  },
  atLeave: {
    opacity: 0,
  },
  mapStyles: ({ opacity }) => ({
    opacity,
  }),
}

export default fade
