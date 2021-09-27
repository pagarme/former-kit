import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ChromePicker } from 'react-color'
import IconClear from 'emblematic-icons/svg/CloseCircle32.svg'

function ColorPicker ({
  color,
  onCancel,
  onChange,
  theme,
}) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false)

  const openDisplayColorPicker = () => {
    setDisplayColorPicker(true)
  }

  const closeDisplayColorPicker = () => {
    setDisplayColorPicker(false)
    onCancel()
  }

  const changeInput = (event) => {
    onChange(event.target.value)
  }

  const changeColorPicker = (colorData) => {
    onChange(colorData.hex)
  }

  return (
    <>
      <div className={theme.container}>
        <div className={theme.containerLeft}>
          <div
            className={theme.color}
            style={{ backgroundColor: color }}
            onClick={openDisplayColorPicker}
            onKeyDown={openDisplayColorPicker}
            role="button"
            tabIndex="0"
          />
          <div className={theme.textColor}>
            <input value={color} onChange={changeInput} />
          </div>
        </div>
        <div className={theme.containerRigth}>
          <button
            className={theme.buttonCancel}
            onClick={closeDisplayColorPicker}
            type="button"
          >
            <IconClear height={16} width={16} />
          </button>
        </div>
      </div>
      {
        displayColorPicker
          ? (
            <div className={theme.popover}>
              <div
                className={theme.cover}
                onClick={closeDisplayColorPicker}
                onKeyDown={closeDisplayColorPicker}
                role="button"
                tabIndex="0"
              />
              <ChromePicker
                color={color}
                disableAlpha
                onChange={changeColorPicker}
                hue={null}
              />
            </div>
          )
          : null
      }
    </>
  )
}

ColorPicker.propTypes = {
  /**
  * Defines color in component
  */
  color: PropTypes.string.isRequired,
  /**
   * Defines function onCancel color picker
   */
  onCancel: PropTypes.func,
  /**
  * Defines function onChange
  */
  onChange: PropTypes.func,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    buttonCancel: PropTypes.string,
    color: PropTypes.string,
    container: PropTypes.string,
    containerLeft: PropTypes.string,
    containerRigth: PropTypes.string,
    cover: PropTypes.string,
    popover: PropTypes.string,
    textColor: PropTypes.string,
  }),
}

ColorPicker.defaultProps = {
  onCancel: () => {},
  onChange: () => {},
  theme: {},
}

export default ColorPicker
