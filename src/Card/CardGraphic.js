import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UICard')

/**
 * Section designated to graphic elements.
 */
const CardGraphic = ({ children, className, theme }) => (
  <div className={classNames(className, theme.graphic)}>
    {children}
  </div>
)

CardGraphic.propTypes = {
  /**
   * Set of React elements which will be rendered inside the component.
   * The `children` should be a graphic.
   */
  children: PropTypes.node.isRequired,
  /**
   * Custom CSS class.
   */
  className: PropTypes.string,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    base: PropTypes.string,
    graphic: PropTypes.string,
  }),
}

CardGraphic.defaultProps = {
  className: null,
  theme: {},
}

export default consumeTheme(CardGraphic)
