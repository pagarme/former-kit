import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UICard')

const CardActions = ({ className, children, theme }) => (
  <div className={classNames(className, theme.actions)}>
    {children}
  </div>
)

CardActions.propTypes = {
  theme: PropTypes.shape({
    base: PropTypes.string,
    actions: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

CardActions.defaultProps = {
  theme: {},
  className: null,
}

export default consumeTheme(CardActions)
