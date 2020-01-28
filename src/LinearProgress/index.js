import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Motion,
  spring,
} from 'react-motion'
import classNames from 'classnames'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UILinearProgress')

/**
 * Progress bar used to show some process progress.
 * The component receives a value and shows it as a progress value.
 */
const LinearProgress = ({
  disabled,
  label,
  max,
  percent,
  theme,
  value,
}) => {
  const linearProgressClasses = classNames(
    theme.linearProgress,
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
          x: spring(value),
        }}
      >
        {({ x }) => {
          const valueNumber = Math.round(x)

          const percentageNumber = Math.round((100 * valueNumber) / max)

          const percentage = `${percentageNumber}%`

          return (
            <Fragment>
              <div className={theme.background}>
                <div
                  className={theme.fill}
                  style={{
                    width: percentage,
                  }}
                  role="progressbar"
                  aria-valuenow={percentageNumber}
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
              {label && (
                <div
                  className={classNames(
                    theme.number,
                    (percentageNumber >= 1) && theme.filledLabel
                  )}
                >
                  <div
                    style={{
                      marginRight: `${100 - percentageNumber}%`,
                    }}
                  >
                    {percent
                      ? percentage
                      : valueNumber
                    }
                  </div>
                </div>
              )}
            </Fragment>
          )
        }}
      </Motion>
    </div>
  )
}

LinearProgress.propTypes = {
  /**
   * It disables/enables the component's functionality.
   */
  disabled: PropTypes.bool,
  /**
   * It shows/hides the component's label.
   */
  label: PropTypes.bool,
  /**
   * The progress max value.
   */
  max: PropTypes.number.isRequired,
  /**
   * It changes the component's label to a percentage number.
   */
  percent: PropTypes.bool,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    background: PropTypes.string,
    disabled: PropTypes.string,
    fill: PropTypes.string,
    filledLabel: PropTypes.string,
    linearProgress: PropTypes.string,
    number: PropTypes.string,
  }),
  /**
   * Value in the progress label.
   */
  value: PropTypes.number.isRequired,
}

LinearProgress.defaultProps = {
  disabled: false,
  label: true,
  percent: true,
  theme: {},
}

export default consumeTheme(LinearProgress)
