import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'
import { Popover } from '../Popover'

const consumeTheme = ThemeConsumer('UIHeader')

/*
 * The menu of the Header.
 */
const HeaderMenu = ({
  children,
  expand,
  icons,
  theme,
  title,
}) => (
  <Popover
    content={children}
    placement="bottomEnd"
  >
    <button className={theme.menu}>
      {title}
      {expand && icons.expand}
    </button>
  </Popover>
)

HeaderMenu.propTypes = {
  /**
   * The children can be any kind of element.
   */
  children: PropTypes.node.isRequired,
  /**
   * The icon theme for this element.
   */
  expand: PropTypes.bool,
  icons: PropTypes.shape({
    /**
     * The icon that will be rendered to expand the options.
     */
    expand: PropTypes.element,
  }),
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
   * The prop used to receive popover target.
   */
  title: PropTypes.node.isRequired,
}

HeaderMenu.defaultProps = {
  expand: true,
  icons: {},
  theme: {},
}

export default consumeTheme(HeaderMenu)
