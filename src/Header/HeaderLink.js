import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIHeader')

/*
 * A link inside the Header. It's used inside
 * the `HeaderLinks` component.
*/
const HeaderLink = ({
  children,
  icon,
  onClick,
  theme,
}) => (
  <button
    onClick={onClick}
    role="link"
    className={theme.link}
    type="button"
  >
    {icon || children}
  </button>
)

HeaderLink.propTypes = {
  /**
   * The children can contain any kind of element and is
   * rendered if the icon is not defined.
   */
  children: PropTypes.node,
  /**
   * The icon of the link. It's used if `children` is not defined.
   */
  icon: PropTypes.element,
  /**
   * The onClick callback that may be used to redirect the user
   * to another page.
   * @param {object} event - the default event object.
   */
  onClick: PropTypes.func.isRequired,
  /**
   * The style classes for this element.
   */
  theme: PropTypes.shape({
    /**
     * The main class used to style the component.
     */
    link: PropTypes.string,
  }),
}

HeaderLink.defaultProps = {
  children: null,
  icon: null,
  theme: {},
}

export default consumeTheme(HeaderLink)
