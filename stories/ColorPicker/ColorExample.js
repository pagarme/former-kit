import React, { useState } from 'react'
import ColorPicker from '../../src/ColorPicker'

const DEFAULT_COLOR = '#65a300'

function ColorPickerExample () {
  const [color, setColor] = useState(DEFAULT_COLOR)

  function onChange (newColor) {
    setColor(newColor)
  }

  function onCancel () {
    setColor(DEFAULT_COLOR)
  }

  return (
    <>
      <h3>Color: {color}</h3>
      <ColorPicker color={color} onChange={onChange} onCancel={onCancel} />
    </>
  )
}

export default ColorPickerExample
