import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIPopover')

const PopoverContent = ({
  children,
  theme,
}) => (
  <div className={theme.content}>
    {children}
  </div>
)

PopoverContent.propTypes = {
  /**
   * Children elements.
   */
  children: PropTypes.node.isRequired,
  /**
    * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
    */
  theme: PropTypes.shape({
    content: PropTypes.string,
  }),
}

PopoverContent.defaultProps = {
  theme: {},
}

export default consumeTheme(PopoverContent)
