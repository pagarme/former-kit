import React from 'react'
import PropTypes from 'prop-types'
import {
  Motion,
  spring,
} from 'react-motion'
import classnames from 'classnames'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UILinearProgress')

/**
 * Progress bar used to show some process progress.
 * The component receives a value and shows it as a progress value.
 */
const LinearProgress = ({
  theme,
  percent,
  disabled,
  base,
}) => {
  const linearProgressClasses = classnames(
    theme.linearProgress,
    theme[base],
    {
      [theme.disabled]: disabled,
    }
  )

  return (
    <div className={linearProgressClasses}>
      <Motion
        defaultStyle={{
          x: 0,
        }}
        style={{
          x: spring(percent),
        }}
      >
        {({ x }) => {
          const percentage = `${Math.round(x)}%`

          return (
            <div>
              <div className={theme.background}>
                <div
                  className={theme.fill}
                  style={{
                    width: percentage,
                  }}
                />
              </div>
              <div
                className={theme.number}
                style={{
                  width: (x > 94) ? '100%' : `${x}%`,
                }}
              >
                <div
                  style={{
                    marginRight: (x > 94) ? '0' : '-1em',
                  }}
                >
                  {percentage}
                </div>
              </div>
            </div>
          )
        }}
      </Motion>
    </div>
  )
}

LinearProgress.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from consumeTheme wrapper.
   */
  theme: PropTypes.shape({
    linearProgress: PropTypes.string,
    fill: PropTypes.string,
    background: PropTypes.string,
    disabled: PropTypes.string,
    number: PropTypes.string,
    dark: PropTypes.string,
    light: PropTypes.string,
  }),
  /**
   * Percentage value in the progress.
   */
  percent: PropTypes.number.isRequired,
  /**
   * Disables/Enables the component's functionality.
   */
  disabled: PropTypes.bool,
  /**
   * The contrast of the background where the component is applied.
   */
  base: PropTypes.oneOf([
    'dark',
    'light',
  ]),
}

LinearProgress.defaultProps = {
  theme: {},
  disabled: false,
  base: 'light',
}

export default consumeTheme(LinearProgress)
