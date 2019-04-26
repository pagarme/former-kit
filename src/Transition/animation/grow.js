const grow = {
  atActive: {
    opacity: 1,
    scale: 1,
  },
  atEnter: {
    opacity: 0.5,
    scale: 0.5,
  },
  atLeave: {
    opacity: 0,
    scale: 0.9,
  },
  mapStyles: ({ opacity, scale }) => ({
    opacity,
    transform: `scale(${scale})`,
  }),
  springOptions: {
    damping: 30,
    precision: 0.01,
    stiffness: 450,
  },
}

export default grow
