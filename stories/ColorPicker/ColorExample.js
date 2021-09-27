import React, { useState } from 'react'
import ColorPicker from '../../src/ColorPicker'

function ColorPickerExample () {
  const [color, setColor] = useState('#65a300')

  function onChange (newColor) {
    setColor(newColor)
  }

  return (
    <>
      <h3>Color: {color}</h3>
      <ColorPicker color={color} onChange={onChange} />
    </>
  )
}

export default ColorPickerExample
