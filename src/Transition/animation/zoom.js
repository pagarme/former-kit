const zoom = {
  atActive: {
    scale: 1,
  },
  atEnter: {
    scale: 0.5,
  },
  atLeave: {
    scale: 0,
  },
  mapStyles: ({ scale }) => ({
    transform: `scale(${scale})`,
  }),
  springOptions: {
    damping: 30,
    precision: 0.01,
    stiffness: 300,
  },
}

export default zoom
