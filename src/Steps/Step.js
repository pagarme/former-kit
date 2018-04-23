import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import IconChecked from 'emblematic-icons/svg/Check24.svg'

import ThemeConsumer from '../ThemeConsumer'

const ConsumeTheme = ThemeConsumer('UISteps')

const Step = ({
  number,
  status,
  theme,
  title,
}) => (
  <div
    className={classNames(theme.step, theme[status])}
  >
    <span className={theme.indicator}>
      {(status === 'success')
        ? <IconChecked width={12} height={12} />
        : number
      }
    </span>

    {title}
  </div>
)

Step.propTypes = {
  theme: PropTypes.shape({
    indicator: PropTypes.string,
    step: PropTypes.string,
  }),
  number: PropTypes.number.isRequired,
  status: PropTypes.oneOf([
    'current',
    'success',
  ]),
  title: PropTypes.string.isRequired,
}

Step.defaultProps = {
  theme: {},
  status: null,
}

export default ConsumeTheme(Step)
