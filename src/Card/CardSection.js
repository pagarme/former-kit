import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { themr } from 'react-css-themr'

const applyTheme = themr('UICard')

class CardSection extends Component {
  constructor (props) {
    super(props)

    this.cardTitle = this.cardTitle.bind(this)
    this.arrowUpDown = this.arrowUpDown.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
  }

  cardTitle () {
    const { collapsedTitle, title, collapsed } = this.props
    return collapsed ? collapsedTitle : title
  }

  arrowUpDown () {
    const {
      onTitleClick,
      icons,
      collapsed,
      theme,
    } = this.props

    if (!onTitleClick || !icons) {
      return null
    }

    return (
      <span className={theme.arrow}>
        {collapsed ? icons.expand : icons.collapse}
      </span>
    )
  }

  renderHeader () {
    const { theme, onTitleClick, collapsed } = this.props

    const headerClassNames = classNames(
      theme.sectionTitle,
      {
        [theme.clickableTitle]: onTitleClick,
      }
    )

    let headerProps = {}

    if (onTitleClick) {
      headerProps = {
        onClick: () => onTitleClick(collapsed),
        role: 'button',
        tabIndex: '0',
      }
    }

    return (
      <div className={headerClassNames} {...headerProps}>
        <span>
          {this.cardTitle()}
          {this.arrowUpDown()}
        </span>
        {this.props.subTitle &&
          <span className={theme.sectionSubtitle}>
            {this.props.subTitle}
          </span>
        }
      </div>
    )
  }

  render () {
    const {
      collapsed,
      children,
      theme,
    } = this.props

    const sectionClassNames = classNames(
      theme.section,
      {
        [theme.expanded]: !collapsed,
        [theme.collapsed]: collapsed,
      }
    )

    return (
      <div className={sectionClassNames}>
        {this.renderHeader()}
        {!collapsed &&
          <div className={theme.sectionContent}>
            {children}
          </div>
        }
      </div>
    )
  }
}

CardSection.propTypes = {
  theme: PropTypes.shape({
    base: PropTypes.string,
    section: PropTypes.string,
    sectionTitle: PropTypes.string,
    clickableTitle: PropTypes.string,
    sectionSubtitle: PropTypes.string,
    sectionContent: PropTypes.string,
    expanded: PropTypes.string,
    collapsed: PropTypes.string,
    arrow: PropTypes.string,
  }),
  icons: PropTypes.shape({
    collapse: PropTypes.element,
    expand: PropTypes.element,
  }),
  title: PropTypes.string.isRequired,
  collapsedTitle: PropTypes.string,
  collapsed: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onTitleClick: PropTypes.func,
  subTitle: PropTypes.string,
}

CardSection.defaultProps = {
  theme: {},
  collapsedTitle: '',
  collapsed: false,
  onTitleClick: null,
  subTitle: '',
  base: 'light',
  icons: {},
}

export default applyTheme(CardSection)
