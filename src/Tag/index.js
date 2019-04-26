import React from 'react'
import PropTypes from 'prop-types'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UITag')

/**
 * Visual noninteractive items which represent an item
 * in a gracefully way.
 */
const Tag = ({
  children,
  theme,
}) => (
  <div className={theme.tag}>
    {children}
  </div>
)

Tag.propTypes = {
  /*
   * The 'children' prop is a node, it could be a string or a react element
   */
  children: PropTypes.node.isRequired,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    /**
     * The main class used to stylize the element.
     */
    tag: PropTypes.string,
  }),
}

Tag.defaultProps = {
  theme: {},
}

export default consumeTheme(Tag)
