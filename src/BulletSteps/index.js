import React from 'react'
import PropTypes from 'prop-types'
import { prop, propEq } from 'ramda'

import BulletStep from './BulletStep'
import ThemeConsumer from '../ThemeConsumer'

const ConsumeTheme = ThemeConsumer('UIBulletSteps')

const getStatusStep = (status, id) => status.find(propEq('id', id))

// eslint-disable-next-line react/prop-types
const getLayoutStep = status => ({ id }) => (
  <BulletStep
    key={id}
    status={prop('status', getStatusStep(status, id))}
  />
)

/**
 * The BulletSteps component is used to mark the progress in the stream of steps.
 */
const BulletSteps = ({
  status,
  steps,
  theme,
}) => (
  <div className={theme.steps}>
    {steps.map(getLayoutStep(status))}
  </div>
)

BulletSteps.propTypes = {
  /**
   * Status of each step.
   */
  status: PropTypes.arrayOf(PropTypes.shape({
    /**
     * ID of respective step.
     */
    id: PropTypes.string,
    /**
     * Status for the step.
     */
    status: PropTypes.oneOf([
      'previous',
      'current',
      'next',
    ]),
  })).isRequired,
  /**
   * The steps which will be show.
   */
  steps: PropTypes.arrayOf(PropTypes.shape({
    /**
     * The ID of step.
     */
    id: PropTypes.string,
  })).isRequired,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    indicator: PropTypes.string,
    step: PropTypes.string,
    steps: PropTypes.string,
  }),
}

BulletSteps.defaultProps = {
  theme: {},
}

export default ConsumeTheme(BulletSteps)
