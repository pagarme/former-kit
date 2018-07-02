import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  anyPass,
  isNil,
  propSatisfies,
} from 'ramda'

import ThemeConsumer from '../ThemeConsumer'

import Tooltip from '../Tooltip'

const consumeTheme = ThemeConsumer('UISidebar')

const Arrow = ({ active, icons }) => {
  const { collapse = null, expand = null } = icons
  return active ? collapse : expand
}

class SidebarLink extends React.Component {
  constructor () {
    super()

    this.state = {
      collapsed: true,
      focused: false,
    }

    this.handleBlur = this.handleBlur.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }

  handleClick () {
    const { children, onClick } = this.props

    if (children) {
      this.setState({
        collapsed: !this.state.collapsed,
      })
    }

    if (!children) {
      onClick()
    }
  }

  handleBlur () {
    this.setState({
      focused: false,
    }, () => (
      this.props.onBlur && this.props.onBlur()
    ))
  }

  handleFocus () {
    this.setState({
      focused: true,
    }, () => (
      this.props.onFocus && this.props.onFocus()
    ))
  }

  render () {
    const {
      active,
      children,
      collapsed,
      icon,
      icons,
      theme,
      title,
    } = this.props

    const renderSubmenu = !this.state.collapsed && !collapsed && children

    return (
      <li
        className={classNames(
          theme.link,
          {
            [theme.active]: active,
            [theme.focused]: this.state.focused,
            [theme.open]: renderSubmenu,
          }
        )}
      >
        <Tooltip
          content={title}
          placement="rightMiddle"
        >
          <button
            onBlur={this.handleBlur}
            onClick={this.handleClick}
            onFocus={this.handleFocus}
            role="link"
          >
            <div className={theme.title}>
              <span className={theme.icon}>{icon}</span>
              {!collapsed && title}


              {(!collapsed && children) &&
                <span className={theme.arrow}>
                  <Arrow
                    active={!this.state.collapsed}
                    icons={icons}
                  />
                </span>
              }
            </div>
          </button>
        </Tooltip>

        {renderSubmenu &&
          <ul className={theme.submenu}>
            {children}
          </ul>
        }
      </li>
    )
  }
}

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
   * @prop {object} expand - icon which represents expand action
   * @prop {object} collapse - icon which represents collapse action
   */
  icons: hasNecessaryIcons,
  /**
   * Triggered by the link's blur event.
   */
  onBlur: PropTypes.func,
  /**
   * The onClick callback. It receives 'events' as an argument.
   * @param {object} event - the default event object.
   */
  onClick: PropTypes.func,
  /**
   * Triggered by the link's focus event.
   */
  onFocus: PropTypes.func,
  /**
   * The title of the component.
   */
  title: PropTypes.string.isRequired,
  /**
   * The style classes for this element.
   */
  theme: PropTypes.shape({
    /**
     * The class used to style the component if it's active.
     */
    active: PropTypes.string,
    /**
     * The class used to style the arrow component.
     */
    arrow: PropTypes.string,
    /**
     * The class used to style when links is focused.
     */
    focused: PropTypes.string,
    /**
     * The class used to style the icon defined by the user.
     */
    icon: PropTypes.string,
    /**
     * The main class used to style the component.
     */
    link: PropTypes.string,
    /**
     * The class used to style the title.
     */
    title: PropTypes.string,
  }),
}

SidebarLink.defaultProps = {
  active: false,
  children: null,
  collapsed: false,
  icon: null,
  icons: {},
  onBlur: null,
  onClick: null,
  onFocus: null,
  theme: {},
}

export default consumeTheme(SidebarLink)
