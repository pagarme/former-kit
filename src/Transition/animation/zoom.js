const zoom = {
  springOptions: {
    damping: 30,
    precision: 0.01,
    stiffness: 300,
  },
  atEnter: {
    scale: 0.5,
  },
  atActive: {
    scale: 1,
  },
  atLeave: {
    scale: 0,
  },
  mapStyles: ({ scale }) => ({
    transform: `scale(${scale})`,
  }),
}

export default zoom
