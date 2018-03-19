import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ThemeConsumer from '../ThemeConsumer'
import Button from '../Button'

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
    this.getArrowIcon = this.getArrowIcon.bind(this)
  }

  getArrowIcon () {
    const {
      collapsed,
      icons: { expand, collapse },
    } = this.props

    if (collapsed) {
      return expand
    }

    return collapse
  }

  cardTitle () {
    const { collapsedTitle, title, collapsed } = this.props
    return collapsed && collapsedTitle.length > 0 ? collapsedTitle : title
  }

  arrowUpDown () {
    const {
      onTitleClick,
      icons,
      theme,
    } = this.props

    if (!onTitleClick || !icons) {
      return null
    }

    return (
      <span className={theme.arrow}>
        {this.getArrowIcon()}
      </span>
    )
  }

  renderHeader () {
    const {
      theme,
      onTitleClick,
      collapsed,
      subtitle,
      icon,
    } = this.props

    let headerProps = {}

    if (onTitleClick) {
      headerProps = {
        onClick: () => onTitleClick(collapsed),
        role: 'button',
        tabIndex: '0',
      }
    }

    const headerClassNames = classNames(
      theme.sectionTitle,
      {
        [theme.clickableTitle]: onTitleClick,
      }
    )

    const renderSectionWithIcon = () => (
      <div className={headerClassNames} {...headerProps}>
        <div className={theme.sectionTwoLineTitle}>
          <span className={theme.sectionIconBox}>
            {icon}
          </span>
          <span className={theme.sectionTitles}>
            {this.cardTitle()}
            {
              (typeof subtitle === 'string') &&
              <span className={theme.sectionSubtitle}>
                {subtitle}
              </span>
            }
          </span>
        </div>
        {
          <Button
            type="button"
            fill="outline"
            size="default"
            relevance="low"
            onClick={this.handleExpand}
            icon={this.getArrowIcon()}
          />
        }
      </div>
    )

    const renderSectionWithoutIcon = () => (
      <div className={headerClassNames} {...headerProps}>
        <span>
          {icon}
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

    return icon ? renderSectionWithIcon() : renderSectionWithoutIcon()
  }

  renderDivider () {
    const { theme, icon } = this.props
    return icon ? (<hr className={theme.divider} />) : null
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
            {this.renderDivider()}
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
    sectionTwoLineTitle: PropTypes.string,
    divider: PropTypes.string,
    sectionIconBox: PropTypes.string,
    sectionTitles: PropTypes.string,
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
   * Section Icon that appears in the top left hand corner of the section tittle
   */
  icon: PropTypes.element,
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
  icon: null,
}

export default applyTheme(CardSection)
