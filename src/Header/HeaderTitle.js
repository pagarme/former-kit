import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIHeader')

/*
 * The title of the header. It's used inside the `Header` component.
*/
const HeaderTitle = ({
  children,
  theme,
}) => (
  <h1 className={theme.title}>{children}</h1>
)

HeaderTitle.propTypes = {
  /**
   * The children can contain any kind of element.
   * It will probably be a string.
   */
  children: PropTypes.node.isRequired,
  /**
   * The style classes for this element.
   */
  theme: PropTypes.shape({
    /**
     * The main class used to style the component.
     */
    title: PropTypes.string,
  }),
}

HeaderTitle.defaultProps = {
  theme: {},
}

export default consumeTheme(HeaderTitle)
