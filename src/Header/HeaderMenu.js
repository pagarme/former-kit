import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIHeader')

/*
 * The menu of the Header.
 */
const HeaderMenu = ({
  children,
  theme,
  onClick,
  icons,
}) => (
  <button
    className={theme.menu}
    onClick={onClick}
    role="link"
  >
    {children}
    {icons.expand}
  </button>
)

HeaderMenu.propTypes = {
  /**
   * The style classes for this element.
   */
  theme: PropTypes.shape({
    /**
     * The main class used to style the component.
     */
    menu: PropTypes.string,
  }),
  /**
   * The onClick callback.
   * It can be used to open the menu, for example.
   * @param {object} event - the default event object.
   */
  onClick: PropTypes.func.isRequired,
  /**
   * The children can be any kind of element.
   */
  children: PropTypes.node.isRequired,
  /**
   * The icon theme for this element.
   */
  icons: PropTypes.shape({
    /**
     * The icon that will be rendered to expand the options.
     */
    expand: PropTypes.element,
  }),
}

HeaderMenu.defaultProps = {
  theme: {},
  icons: {},
}

export default consumeTheme(HeaderMenu)
