import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UICard')

const CardGraphic = ({ className, children, theme }) => (
  <div className={classNames(className, theme.graphic)}>
    {children}
  </div>
)

CardGraphic.propTypes = {
  theme: PropTypes.shape({
    base: PropTypes.string,
    graphic: PropTypes.string,
  }).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

CardGraphic.defaultProps = {
  theme: {},
  className: null,
}

export default consumeTheme(CardGraphic)
