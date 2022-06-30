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
  acronym,
  children,
  color,
  'data-testid': dataTestId,
  hideLabel,
  textColor,
  textFormat,
  theme,
}) => {
  const labelClasses = cx(
    theme[textFormat],
    theme.acronym
  )

  return (
    <div className={theme.legend}>
      <abbr
        data-testid={dataTestId}
        title={children}
        className={labelClasses}
        style={{
          background: color,
          color: textColor,
        }}
      >
        {acronym || defineInitials(children)}
      </abbr>
      {!hideLabel && (
        <span className={theme.text}>
          {children}
        </span>
      )}
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
  children: PropTypes.node,
  /**
   * The background color of the Legend.
   */
  color: PropTypes.string.isRequired,
  /**
   * Test selectors
   */
  'data-testid': PropTypes.string,
  /**
   * Hides the received label and shows only the acronym.
   */
  hideLabel: PropTypes.bool,
  /**
   * The text color of the Legend.
   */
  textColor: PropTypes.string,
  /**
 * The text format of the acronym
 */
  textFormat: PropTypes.oneOf(['capitalize', 'uppercase']),
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
  children: [],
  'data-testid': null,
  hideLabel: false,
  textColor: '#ffffff',
  textFormat: 'uppercase',
  theme: {},
}

export default consumeTheme(Legend)
