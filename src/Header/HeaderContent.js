import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIHeader')

/* The content of the Header */
const HeaderContent = ({
  children,
  theme,
}) => (
  <div className={theme.content}>
    {children}
  </div>
)

HeaderContent.propTypes = {
  /**
   * The children can contain any kind of component.
   */
  children: PropTypes.node.isRequired,
  /**
   * The style classes for this element.
   */
  theme: PropTypes.shape({
    /**
     * The main class used to style the component.
     */
    content: PropTypes.string,
  }),
}

HeaderContent.defaultProps = {
  theme: {},
}

export default consumeTheme(HeaderContent)
