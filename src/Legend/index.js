import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import {
  pipe,
  split,
  map,
  join,
  toUpper,
  head,
} from 'ramda'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UILegend')

const defineInitials = pipe(
  split(' '),
  map(head),
  join(''),
  toUpper
)

/**
 * The component that shows a small symbol with an abbreviation and a tip
 * about the content. Can be customized with a color and an acronym.
 */
const Legend = ({
  color,
  children,
  outline,
  acronym,
  hideLabel,
  theme,
}) => {
  const labelClasses = cx(
    theme.acronym,
    {
      [theme.outline]: outline,
    }
  )

  return (
    <div className={theme.legend}>
      <abbr
        title={children}
        className={labelClasses}
        style={{ background: color }}
      >
        {acronym || defineInitials(children)}
      </abbr>
      {!hideLabel &&
        <span className={theme.text}>
          {children}
        </span>
      }
    </div>
  )
}

Legend.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from consumeTheme wrapper.
   */
  theme: PropTypes.shape({
    acronym: PropTypes.string,
    outline: PropTypes.string,
    legend: PropTypes.string,
    text: PropTypes.string,
  }),
  /**
   * The color of the Legend.
   */
  color: PropTypes.string.isRequired,
  /**
   * React element which will be shown if the label is not hidden.
   */
  children: PropTypes.string.isRequired,
  /**
   * Keeps the background without color and adds the color received
   * only in the borders.
   */
  outline: PropTypes.bool,
  /**
   * Abbreviation which will be shown in the component.
   */
  acronym: PropTypes.string,
  /**
   * Hides the received label and shows only the acronym.
   */
  hideLabel: PropTypes.bool,
}

Legend.defaultProps = {
  theme: {},
  outline: false,
  acronym: '',
  hideLabel: false,
}

export default consumeTheme(Legend)
