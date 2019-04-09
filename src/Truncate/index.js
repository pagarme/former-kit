import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  equals,
  is,
  prop,
} from 'ramda'
// import { usePrevious, useWindowResize } from '../hooks'
// import { usePrevious } from '../hooks'
import ThemeConsumer from '../ThemeConsumer'
import Tooltip from '../Tooltip'
import matchTextToParentSize from './matchTextToParentSize'

const consumeTheme = ThemeConsumer('UITruncate')

const canvas = document.createElement('canvas')
const canvasContext = canvas.getContext('2d')

const getOffsetMeasures = element => ({
  height: element.offsetHeight,
  width: element.offsetWidth,
})

const hasElementChangedMeasures = (element, prevMeasures) => !equals(
  getOffsetMeasures(element),
  prevMeasures
)

const validateEllipsis = (props, propName) => {
  if (propName === 'ellipsis') {
    const { ellipsis, multiline } = props

    if (ellipsis && !multiline) {
      throw new Error('The prop ellipsis is only avaiable to multiline truncate')
    }

    if (ellipsis && !is(String, ellipsis)) {
      throw new Error('The prop ellipsis must be a string')
    }
  }
}

const measureText = measuredText => (
  canvasContext
    ? canvasContext.measureText(measuredText).width
    : 0
)

/**
 * Visual breaking line with ellipsis
 */
const Truncate = ({
  ellipsis,
  multiline,
  // resizableByWindow,
  text,
  theme,
  tooltipPlacement,
}) => {
  const [currentText, setCurrentText] = useState(text)
  const [isTruncated, setIsTruncated] = useState(false)
  const [parentMeasures, setParentMeasures] = useState(null)
  // const [wrapperElement, setWrapperElement] = useState(null)
  // const parentElement = useRef(null)
  const prevText = useRef(currentText)
  const wrapperRef = useRef(null)

  // const fitText = (parent) => {
  //   console.log('fitText')
  //   const wrapper = prop('current', wrapperRef)
  //   const parent = prop('parentElement', wrapper)

  //   if (parent && wrapper) {
  //     const newText = matchTextToParentSize(
  //       text,
  //       parent,
  //       ellipsis,
  //       wrapper
  //     )

  //     setCurrentText(newText)
  //     setParentMeasures({
  //       height: parent.offsetHeight,
  //       width: parent.offsetWidth,
  //     })
  //     setIsTruncated(newText.indexOf(ellipsis) >= 0)
  //     // setWrapperElement(wrapper)

  //     if (wrapper && wrapper.style) {
  //       wrapper.style.visibility = 'visible'
  //     }
  //   }
  // }

  // const handleResize = () => {
  //   const { current: parent } = parentElement
  //   const wrapper = wrapperRef.current
  //         || parent.querySelector('div[name="truncate"]')
  //         || wrapperElement
  //   if (parent && wrapper) {
  //     fitText(parent, wrapper)
  //   }
  // }

  const emptyStateEffect = () => {
    const wrapper = prop('current', wrapperRef)
    const parent = prop('parentElement', wrapper)
    console.log({ currentText })
    if (
      parent
      && wrapper
      && hasElementChangedMeasures(parent, parentMeasures)
    ) {
      const parentStyle = window.getComputedStyle(parent)
      const font = [
        parentStyle['font-weight'],
        parentStyle['font-style'],
        parentStyle['font-size'],
        parentStyle['font-family'],
      ].join(' ')

      canvasContext.font = font
      const newText = matchTextToParentSize(
        currentText,
        parent,
        ellipsis,
        wrapper
      )

      if (newText !== currentText) {
        prevText.current = currentText
        setCurrentText(newText)
      }


      if (multiline) {
        setIsTruncated(measureText(currentText) > parent.offsetWidth)
      } else {
        setIsTruncated(newText.length < currentText.length)
      }
      setParentMeasures({
        height: parent.offsetHeight,
        width: parent.offsetWidth,
      })


      // setWrapperElement(currentRef)

      wrapper.style.visibility = 'visible'
    }
  }

  // const refreshEffect = () => {
  //   if (multiline) {
  //     const { current: parent } = parentElement

  //     if (wrapperRef.current && parent) {
  //       if (
  //         (!currentText && text)
  //         || (prevText !== text)
  //         || hasElementChangedMeasures(parent, parentMeasures)
  //       ) {
  //         fitText(parent)
  //       }
  //     }
  //   }
  // }

  useEffect(emptyStateEffect)
  // useEffect(refreshEffect)
  // if (multiline && resizableByWindow) {
  //   useWindowResize(handleResize.bind(this))
  // }

  if (isTruncated) {
    const width = parentMeasures.width
      ? `${parentMeasures.width}px`
      : '100%'

    return (
      <Tooltip
        placement={tooltipPlacement}
        content={text}
      >
        <div
          name="truncate"
          className={!multiline ? theme.truncate : ''}
          style={{ width }}
          ref={wrapperRef}
        >
          {currentText}
        </div>
      </Tooltip>
    )
  }
  return (
    <div
      name="truncate"
      className={!multiline ? theme.truncate : ''}
      // style={{ visibility: 'hidden' }}
      ref={wrapperRef}
    >
      {currentText}
    </div>
  )
}

Truncate.propTypes = {
  /**
   * String which will be used as ellipsis when the multiline prop is true.
   */
  ellipsis: validateEllipsis,
  /**
   * Indicates if the truncate will use more than one line.
   */
  multiline: PropTypes.bool,
  /**
   * When true add a listener to window resize event which will
   * trigger the resize of the truncate element.
   */
  // resizableByWindow: PropTypes.bool,
  /**
   * Text which will be truncated.
  */
  text: PropTypes.string.isRequired,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    ellipsis: PropTypes.string,
    truncate: PropTypes.string,
  }),
  /**
   * This prop control the tooltip position when the text is truncated
   */
  tooltipPlacement: PropTypes.oneOf([
    'bottomCenter',
    'bottomEnd',
    'bottomStart',
    'leftEnd',
    'leftMiddle',
    'leftStart',
    'rightEnd',
    'rightMiddle',
    'rightStart',
    'target',
    'tooltip',
    'topCenter',
    'topEnd',
    'topStart',
  ]),
}

Truncate.defaultProps = {
  multiline: false,
  ellipsis: '',
  // resizableByWindow: false,
  theme: {},
  tooltipPlacement: 'bottomCenter',
}

export default consumeTheme(Truncate)
