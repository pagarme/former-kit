import React, { useEffect, useState, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  is,
  prop,
} from 'ramda'
import { usePrevious } from '../hooks'
import ThemeConsumer from '../ThemeConsumer'
import Tooltip from '../Tooltip'
import matchTextToParentSize from './matchTextToParentSize'

const consumeTheme = ThemeConsumer('UITruncate')
const canvas = document.createElement('canvas')
const canvasContext = canvas.getContext('2d')
const defaultEllipsis = '...'

const validateEllipsis = (props, propName) => {
  if (propName === 'ellipsis') {
    const { ellipsis, multiline } = props

    if (ellipsis && ellipsis !== defaultEllipsis && !multiline) {
      throw new Error('The prop ellipsis is only available to multiline truncate')
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
 * Visual line breaking with ellipsis
 */
const Truncate = ({
  ellipsis,
  multiline,
  resizableByWindow,
  text,
  theme,
  tooltipPlacement,
}) => {
  const [currentText, setCurrentText] = useState(text)
  const [isTruncated, setIsTruncated] = useState(false)
  const [parentMeasures, setParentMeasures] = useState(null)
  const prevText = usePrevious(text)
  const parentRef = useRef(null)
  const wrapperRef = useRef(null)

  const fitText = useCallback((parent, wrapper) => {
    if (parent && wrapper) {
      const { newText, isTruncated: truncated } = matchTextToParentSize(
        text,
        parent,
        ellipsis,
        wrapper
      )

      setCurrentText(newText)
      setParentMeasures({
        height: parent.offsetHeight,
        width: parent.offsetWidth,
      })
      setIsTruncated(truncated)

      if (wrapper.style) {
        // eslint-disable-next-line no-param-reassign
        wrapper.style.visibility = 'visible'
      }
    }
  }, [text, ellipsis])

  const handleResize = useCallback(() => {
    const wrapper = prop('current', wrapperRef)
    const parent = prop('current', parentRef)

    if (parent && wrapper) {
      fitText(parent, wrapper)
    }
  }, [fitText, parentRef, wrapperRef])

  const emptyStateEffect = () => {
    const wrapper = prop('current', wrapperRef)

    if (wrapper && !wrapper.innerText) {
      const parent = prop('parentElement', wrapper)
      if (parent) {
        const parentStyle = window.getComputedStyle(parent)
        const font = [
          parentStyle['font-weight'],
          parentStyle['font-style'],
          parentStyle['font-size'],
          parentStyle['font-family'],
        ].join(' ')

        canvasContext.font = font

        if (!parentRef.current) {
          parentRef.current = parent
        }

        if (!multiline) {
          setCurrentText(text)
        }

        setIsTruncated(measureText(text) > parent.offsetWidth)
        setParentMeasures({
          height: parent.offsetHeight,
          width: parent.offsetWidth,
        })

        wrapper.style.visibility = 'visible'
      }
    }
  }

  useEffect(emptyStateEffect, [multiline, parentRef, text, wrapperRef])
  useEffect(() => {
    const wrapper = prop('current', wrapperRef)
    if (multiline) {
      const parent = prop('current', parentRef)
      if (parent && wrapper) {
        if (prevText !== text) {
          fitText(parent, wrapper)
        }
      }
    }
    if (!isTruncated && wrapper && wrapper.style) {
      wrapper.style.visibility = 'visible'
    }
  }, [fitText, isTruncated, multiline, parentRef, prevText, wrapperRef, text])

  useEffect(() => { // eslint-disable-line consistent-return
    if (multiline && resizableByWindow) {
      window.addEventListener('resize', handleResize)

      return (() => window.removeEventListener('resize', handleResize))
    }
  }, [fitText, handleResize, multiline, resizableByWindow])

  const prepareTruncatedComponent = style => (
    <div
      name="truncate"
      className={!multiline ? theme.truncate : ''}
      style={style}
      ref={wrapperRef}
    >
      {currentText}
    </div>
  )

  if (isTruncated) {
    const width = parentMeasures.width
      ? `${parentMeasures.width}px`
      : '100%'

    return (
      <Tooltip
        placement={tooltipPlacement}
        content={text}
      >
        {prepareTruncatedComponent({ width })}
      </Tooltip>
    )
  }

  return prepareTruncatedComponent({ visibility: 'hidden' })
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
   * When true adds a listener to window resize event which will
   * trigger the resize of the truncate element.
   */
  resizableByWindow: PropTypes.bool,
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
   * This prop controls the tooltip position when the text is truncated
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
  ellipsis: defaultEllipsis,
  multiline: false,
  resizableByWindow: false,
  theme: {},
  tooltipPlacement: 'bottomCenter',
}

export default consumeTheme(React.memo(Truncate))
