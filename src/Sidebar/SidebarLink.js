import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { themr } from 'react-css-themr'
import {
  anyPass,
  isNil,
  propSatisfies,
} from 'ramda'

const applyThemr = themr('UISidebar')

const Arrow = ({ active, icons }) => {
  const { collapse, expand } = icons

  return active ? collapse : expand
}

Arrow.propTypes = {
  active: PropTypes.bool.isRequired,
  icons: PropTypes.shape({
    collapse: PropTypes.element,
    expand: PropTypes.element,
  }).isRequired,
}

const SidebarLink = ({
  theme,
  title,
  subtitle,
  children,
  onClick,
  active,
  collapsed,
  icons,
}) => (
  <li
    className={classNames(theme.link, {
      [theme.active]: active,
    })}
  >
    <div
      onClick={onClick}
      role="button"
      tabIndex="0"
    >
      <div className={theme.title}>
        <span className={theme.icon}>{icons.link}</span>
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
    </div>

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
      throw new Error(
        'The prop icons must have collapse and expand props when children prop is not empty'
      )
    }
  }
}

SidebarLink.propTypes = {
  theme: PropTypes.shape({
    link: PropTypes.string,
    active: PropTypes.string,
    text: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    icon: PropTypes.string,
  }),
  active: PropTypes.bool,
  children: PropTypes.node,
  subtitle: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
  collapsed: PropTypes.bool,
  icons: hasNecessaryIcons,
}

SidebarLink.defaultProps = {
  theme: {},
  active: false,
  children: null,
  onClick: null,
  subtitle: '',
  collapsed: false,
  icons: {},
}

export default applyThemr(SidebarLink)
