import React from 'react'
import PropTypes from 'prop-types'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UITag')

/**
 * Visual noninteractive items which represent an item
 * in a gracefully way.
 */
const Tag = ({
  theme,
  children,
}) => (
  <div className={theme.tag}>
    {children}
  </div>
)

Tag.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from consumeTheme wrapper
   */
  theme: PropTypes.shape({
    /**
     * The main class used to stylize the element.
     */
    tag: PropTypes.string,
  }),
  /*
   * The 'children' prop is a string.
   */
  children: PropTypes.string.isRequired,
}

Tag.defaultProps = {
  theme: {},
}

export default consumeTheme(Tag)
