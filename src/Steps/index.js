import React from 'react'
import PropTypes from 'prop-types'
import { path } from 'ramda'

import ThemeConsumer from '../ThemeConsumer'
import Step from './Step'

const ConsumeTheme = ThemeConsumer('UISteps')

const getStatusStep = (status, id) => status.find(item => item.id === id)

const Steps = ({
  status,
  steps,
  theme,
}) => (
  <div className={theme.steps}>
    {
      steps.map(({ id, title }, index) => (
        <Step
          key={id}
          number={index + 1}
          status={path(['status'], getStatusStep(status, id))}
          title={title}
        />
      ))
    }
  </div>
)

Steps.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    indicator: PropTypes.string,
    step: PropTypes.string,
    steps: PropTypes.string,
  }),
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
}

Steps.defaultProps = {
  theme: {},
}

export default ConsumeTheme(Steps)
