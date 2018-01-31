import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  anyPass,
  isNil,
  propSatisfies,
} from 'ramda'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UISidebar')

const Arrow = ({ active, icons }) => {
  const { collapse = null, expand = null } = icons

  return active ? collapse : expand
}

Arrow.propTypes = {
  /**
   * Indicates which icon should be rendered.
   */
  active: PropTypes.bool.isRequired,
  /**
   * The icon theme for this element.
   */
  icons: PropTypes.shape({
    /**
     * The icon shown when the SidebarLink is collapsed.
     */
    collapse: PropTypes.element,
    /**
     * The icon shown when the SidebarLink is expanded.
     */
    expand: PropTypes.element,
  }),
}

Arrow.defaultProps = {
  icons: {},
}

const SidebarLink = ({
  theme,
  title,
  subtitle,
  children,
  onClick,
  active,
  collapsed,
  icon,
  icons,
}) => (
  <li
    className={classNames(theme.link, {
      [theme.active]: active,
    })}
  >
    <button
      onClick={onClick}
      role="link"
    >
      <div className={theme.title}>
        <span className={theme.icon}>{icon}</span>
        {!collapsed && title}

        {(!collapsed && !subtitle && children) &&
          <Arrow
            active={active}
            icons={icons}
          />
        }
      </div>

      {subtitle &&
        <div className={theme.subtitle}>
          <span>{subtitle}</span>
          {children && <Arrow active={active} icons={icons} />}
        </div>
      }
    </button>

    {active && children}
  </li>
)

const hasNoArrows = anyPass([
  propSatisfies(isNil, 'collapse'),
  propSatisfies(isNil, 'expand'),
])

const hasNecessaryIcons = ({ icons, children }, propName) => {
  if (propName === 'icons') {
    if (!isNil(children) && hasNoArrows(icons)) {
      throw new Error(`
        The prop icons must have collapse and
        expand props when children prop is not empty
      `)
    }
  }
}

SidebarLink.propTypes = {
  /**
   * The style classes for this element.
   */
  theme: PropTypes.shape({
    /**
     * The main class used to style the component.
     */
    link: PropTypes.string,
    /**
     * The class used to style the component if it's active.
     */
    active: PropTypes.string,
    /**
     * The class used to style the title.
     */
    title: PropTypes.string,
    /**
     * The class used to style the subtitle.
     */
    subtitle: PropTypes.string,
    /**
     * The class used to style the icon defined by the user.
     */
    icon: PropTypes.string,
  }),
  /**
   * Indicates if the element is active or not.
   */
  active: PropTypes.bool,
  /**
   * The children can contain any kind of component.
   */
  children: PropTypes.node,
  /**
   * Indicates if the element is collapsed or not.
   */
  collapsed: PropTypes.bool,
  /**
   * The icon defined by the user. It's shown with the title
   * and is also shown alone when the sidebar is collapsed.
   */
  icon: PropTypes.element,
  /**
   * The icon theme for this element.
   * The icons 'collapse' and 'expand' are mandatory if
   * the element has children.
   * @prop {object} expand - icon which represents expand acion
   * @prop {object} collapse - icon which represents collapse acion
   */
  icons: hasNecessaryIcons,
  /**
   * The onClick callback. It receives 'events' as an argument.
   * @param {object} event - the default event object.
   */
  onClick: PropTypes.func,
  /**
   * The subtitle of the component.
   */
  subtitle: PropTypes.string,
  /**
   * The title of the component.
   */
  title: PropTypes.string.isRequired,
}

SidebarLink.defaultProps = {
  theme: {},
  active: false,
  children: null,
  collapsed: false,
  icon: null,
  icons: {},
  onClick: null,
  subtitle: '',
}

export default consumeTheme(SidebarLink)
