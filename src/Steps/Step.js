import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import IconChecked from 'emblematic-icons/svg/Check24.svg'
import IconClose from 'emblematic-icons/svg/ClearClose24.svg'

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
      {status === 'success' && <IconChecked width={12} height={12} />}
      {status === 'error' && <IconClose width={12} height={12} />}
      {!(['error', 'success'].includes(status)) && (
        <span className={theme.number}>{number}</span>
      )}
    </span>
    {title}
  </div>
)

Step.propTypes = {
  number: PropTypes.number.isRequired,
  status: PropTypes.oneOf([
    'current',
    'error',
    'pending',
    'success',
  ]),
  theme: PropTypes.shape({
    indicator: PropTypes.string,
    number: PropTypes.string,
    step: PropTypes.string,
  }),
  title: PropTypes.string.isRequired,
}

Step.defaultProps = {
  status: null,
  theme: {},
}

export default ConsumeTheme(Step)
