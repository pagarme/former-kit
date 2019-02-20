const fold = {
  springOptions: {
    damping: 30,
    precision: 0.01,
    stiffness: 100,
  },
  atEnter: {
    height: 0,
    opacity: 0,
  },
  atActive: {
    height: 100,
    opacity: 1,
  },
  atLeave: {
    height: 0,
    opacity: 0,
  },
  mapStyles: ({ height, opacity }) => ({
    height: `${height}%`,
    opacity: height > 10 ? opacity : 0,
  }),
}

export default fold
