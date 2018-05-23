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
 * about the content. It can be customized with a color and an acronym.
 */
const Legend = ({
  color,
  children,
  acronym,
  hideLabel,
  theme,
}) => {
  const labelClasses = cx(
    theme.acronym
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
   * Abbreviation which will be shown in the component.
   */
  acronym: PropTypes.string,
  /**
   * React element which will be shown if the label is not hidden.
   */
  children: PropTypes.string.isRequired,
  /**
   * The color of the Legend.
   */
  color: PropTypes.string.isRequired,
  /**
   * Hides the received label and shows only the acronym.
   */
  hideLabel: PropTypes.bool,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    acronym: PropTypes.string,
    legend: PropTypes.string,
    text: PropTypes.string,
  }),
}

Legend.defaultProps = {
  acronym: '',
  hideLabel: false,
  theme: {},
}

export default consumeTheme(Legend)
