import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ThemeConsumer from '../ThemeConsumer'

const applyTheme = ThemeConsumer('UICard')

/**
 * Highlighted sections that are used inside cards
 * and can hide and show their children.
 */
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
    const {
      theme,
      onTitleClick,
      collapsed,
      subtitle,
    } = this.props

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
        {
          (typeof subtitle === 'string') &&
          <span className={theme.sectionSubtitle}>
            {subtitle}
          </span>
        }
        {
          (typeof subtitle !== 'string') &&
            subtitle
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
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
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
  /**
   * Default icons received by theme. These icons are used in the toggle function
   * which hides or shows the 'children' elements.
   */
  icons: PropTypes.shape({
    collapse: PropTypes.element,
    expand: PropTypes.element,
  }),
  /**
   * Title in the top of the section that appears when the content is not collapsed.
   */
  title: PropTypes.string.isRequired,
  /**
   * Title in the top of the section that appears when the content is collapsed.
   */
  collapsedTitle: PropTypes.string,
  /**
   * Collapses 'children' when the value is true and expands 'children'
   * when the value is false.
   */
  collapsed: PropTypes.bool,
  /**
   * Set of React elements which will be rendered inside the section.
   */
  children: PropTypes.node.isRequired,
  /**
   * Callback triggered when the title in the section receives a click.
   * @param {bool} collapsed
   */
  onTitleClick: PropTypes.func,
  /**
   * Subtitle inside the section.
   */
  subtitle: PropTypes.node,
}

CardSection.defaultProps = {
  theme: {},
  collapsedTitle: '',
  collapsed: false,
  onTitleClick: null,
  subtitle: null,
  icons: {},
}

export default applyTheme(CardSection)
