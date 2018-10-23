const Grow = {
  springOptions: {
    damping: 30,
    precision: 0.01,
    stiffness: 450,
  },
  atEnter: {
    opacity: 0.5,
    scale: 0.5,
  },
  atActive: {
    opacity: 1,
    scale: 1,
  },
  atLeave: {
    opacity: 0,
    scale: 0.9,
  },
  mapStyles: ({ scale, opacity }) => ({
    opacity,
    transform: `scale(${scale})`,
  }),
}

export default Grow
