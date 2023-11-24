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
  constructor (props) {
    super(props)

    this.state = {
      focused: false,
    }

    this.handleBlur = this.handleBlur.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }

  handleClick () {
    const { onClick } = this.props
    onClick()
  }

  handleBlur () {
    const { onBlur } = this.props
    this.setState({
      focused: false,
    }, () => (onBlur && onBlur()))
  }

  handleFocus () {
    const { onFocus } = this.props
    this.setState({
      focused: true,
    }, () => (onFocus && onFocus()))
  }

  renderButton () {
    const {
      children,
      collapsed,
      'data-testid': dataTestId,
      hasSeparator,
      icon,
      iconRight,
      icons,
      theme,
      title,
    } = this.props

    return (
      <button
        data-testid={dataTestId}
        onBlur={this.handleBlur}
        onClick={this.handleClick}
        onFocus={this.handleFocus}
        className={hasSeparator ? theme.separator : ''}
        role="link"
        type="button"
      >
        <div className={theme.title}>
          <div>
            <span className={theme.icon}>{icon}</span>
            {title}
          </div>
          {children && (
            <span className={theme.arrow}>
              <Arrow
                active={collapsed}
                icons={icons}
              />
            </span>
          )}
          {!children && !!iconRight && (
            <span className={theme.arrow}>
              {iconRight}
            </span>
          )}
        </div>
      </button>
    )
  }

  render () {
    const {
      active,
      children,
      collapsed,
      theme,
      title,
    } = this.props
    const { focused } = this.state
    const renderSubmenu = children !== null && collapsed
    return (
      <li
        className={classNames(
          theme.link,
          {
            [theme.active]: active,
            [theme.focused]: focused,
            [theme.open]: renderSubmenu,
          }
        )}
      >
        {collapsed
          ? (
            <Tooltip
              content={title}
              placement="rightMiddle"
            >
              {this.renderButton()}
            </Tooltip>
          )
          : this.renderButton()
        }

        {renderSubmenu && (
          <ul className={theme.submenu}>
            {children}
          </ul>
        )}
      </li>
    )
  }
}

const hasNoArrows = anyPass([
  propSatisfies(isNil, 'collapse'),
  propSatisfies(isNil, 'expand'),
])

const hasNecessaryIcons = ({ children, icons }, propName) => {
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
   * Test selectors
   */
  'data-testid': PropTypes.string,
  /**
   * If true, includes a border at the top of the link
   */
  hasSeparator: PropTypes.bool,
  /**
   * The icon defined by the user. It's shown with the title
   * and is also shown alone when the sidebar is collapsed.
   */
  icon: PropTypes.element,
  /**
   * The icon defined by the user. It's shown with the title
   */
  iconRight: PropTypes.element,
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
   * Indicates if the border left style.
   */
    borderButton: PropTypes.string,
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
     * The class used to opened menu.
     */
    open: PropTypes.string,
    /**
     * The class used to style the link that are a separator.
     */
    separator: PropTypes.string,
    /**
     * The class used to submenu.
     */
    submenu: PropTypes.string,
    /**
     * The class used to style the title.
     */
    title: PropTypes.string,
  }),
  /**
   * The title of the component.
   */
  title: PropTypes.string.isRequired,
}

SidebarLink.defaultProps = {
  active: false,
  children: null,
  collapsed: false,
  'data-testid': null,
  hasSeparator: false,
  icon: null,
  iconRight: null,
  icons: {},
  onBlur: null,
  onClick: null,
  onFocus: null,
  theme: {},
}

export default consumeTheme(SidebarLink)
