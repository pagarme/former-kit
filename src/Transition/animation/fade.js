const fade = {
  atActive: {
    opacity: 1,
  },
  atEnter: {
    opacity: 0.3,
  },
  atLeave: {
    opacity: 0,
  },
  mapStyles: ({ opacity }) => ({
    opacity,
  }),
  springOptions: {
    damping: 30,
    precision: 0.01,
    stiffness: 300,
  },
}

export default fade
