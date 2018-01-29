import React from 'react'
import { themr } from 'react-css-themr'
import PropTypes from 'prop-types'
import {
  Motion,
  spring,
} from 'react-motion'
import classnames from 'classnames'

const applyThemr = themr('UILinearProgress')

const Linear = ({
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

Linear.propTypes = {
  theme: PropTypes.shape({
    linearProgress: PropTypes.string,
    fill: PropTypes.string,
    background: PropTypes.string,
    disabled: PropTypes.string,
    number: PropTypes.string,
    dark: PropTypes.string,
    light: PropTypes.string,
  }),
  percent: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  base: PropTypes.oneOf([
    'dark',
    'light',
  ]),
}

Linear.defaultProps = {
  theme: {},
  disabled: false,
  base: 'light',
}

export default applyThemr(Linear)
