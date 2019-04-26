import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import ThemeConsumer from '../ThemeConsumer'

const ConsumeTheme = ThemeConsumer('UIBulletSteps')

const BulletStep = ({ status, theme }) => (
  <span className={classNames(theme.step, theme[status])} />
)

BulletStep.propTypes = {
  /**
   * Status of each step.
   */
  status: PropTypes.oneOf([
    'previous',
    'current',
    'next',
  ]).isRequired,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    indicator: PropTypes.string,
    status: PropTypes.string,
    step: PropTypes.string,
  }),
}

BulletStep.defaultProps = {
  theme: {},
}

export default ConsumeTheme(BulletStep)
