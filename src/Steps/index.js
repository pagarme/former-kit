import React from 'react'
import PropTypes from 'prop-types'
import { prop, propEq } from 'ramda'

import ThemeConsumer from '../ThemeConsumer'
import Step from './Step'

const ConsumeTheme = ThemeConsumer('UISteps')

const getStatusStep = (status, id) => status.find(propEq('id', id))

// eslint-disable-next-line react/prop-types
const getLayoutStep = status => ({ id, title }, index) => (
  <Step
    key={id}
    number={index + 1}
    status={prop('status', getStatusStep(status, id))}
    title={title}
  />
)

const Steps = ({
  status,
  steps,
  theme,
}) => (
  <div className={theme.steps}>
    {steps.map(getLayoutStep(status))}
  </div>
)

Steps.propTypes = {
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
      'current',
      'error',
      'pending',
      'success',
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
    /**
     * The title of step.
     */
    title: PropTypes.string,
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

Steps.defaultProps = {
  theme: {},
}

export default ConsumeTheme(Steps)
