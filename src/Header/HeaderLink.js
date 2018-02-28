import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIHeader')

/*
 * A link inside the Header. It's used inside
 * the `HeaderLinks` component.
*/
const HeaderLink = ({
  theme,
  onClick,
  icon,
  children,
}) => (
  <button
    onClick={onClick}
    role="link"
    className={theme.link}
  >
    {icon || children}
  </button>
)

HeaderLink.propTypes = {
  /**
   * The style classes for this element.
   */
  theme: PropTypes.shape({
    /**
     * The main class used to style the component.
     */
    link: PropTypes.string,
  }),
  /**
   * The onClick callback that may be used to redirect the user
   * to another page.
   * @param {object} event - the default event object.
   */
  onClick: PropTypes.func.isRequired,
  /**
   * The icon of the link. It's used if `children` is not defined.
   */
  icon: PropTypes.element,
  /**
   * The children can contain any kind of element and is
   * rendered if the icon is not defined.
   */
  children: PropTypes.node,
}

HeaderLink.defaultProps = {
  theme: {},
  icon: null,
  children: null,
}

export default consumeTheme(HeaderLink)
