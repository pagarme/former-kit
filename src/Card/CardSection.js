import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const applyTheme = ThemeConsumer('UICard')

/**
 * Highlighted sections that are used inside cards.
 */
const CardSection = ({ children, theme }) => (
  <div className={theme.section}>
    {children}
  </div>
)

CardSection.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    /**
     * The main container class name
     */
    section: PropTypes.string,
  }),
  /**
   * Set of React elements which will be rendered inside the section.
   */
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
}

CardSection.defaultProps = {
  theme: {},
}

export default applyTheme(CardSection)
