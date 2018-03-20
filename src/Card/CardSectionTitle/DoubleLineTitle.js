import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ThemeConsumer from '../../ThemeConsumer'
import Button from '../../Button'

const consumeTheme = ThemeConsumer('UICard')

class CardSectionTwoLinesTitle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: props.collapsed,
    }
    this.arrowUpDown = this.arrowUpDown
    this.getArrowIcon = this.getArrowIcon
    this.handleClick = this.handleClick
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

  arrowUpDown () {
    const {
      onClick,
      icons,
      theme,
    } = this.props

    if (!onClick || !icons) {
      return null
    }

    return (
      <span className={theme.arrow}>
        {this.getArrowIcon()}
      </span>
    )
  }

  handleClick () {
    const { collapsed } = this.state
    this.setState({
      collapsed: !collapsed,
    })
    this.props.onClick(!collapsed)
  }

  render () {
    const {
      collapsed,
      icon,
      onClick,
      subtitle,
      theme,
      title,
    } = this.props

    let headerProps = {}

    if (onClick) {
      headerProps = {
        onClick: () => onClick(collapsed),
        role: 'button',
        tabIndex: '0',
      }
    }

    const headerClassNames = classNames(
      theme.sectionTitles,
      {
        [theme.clickableTitle]: onClick,
      }
    )

    return (
      <div className={headerClassNames} {...headerProps}>
        <div className={theme.doubleLineTitle}>
          <div >
            <span className={theme.sectionIconBox}>
              {icon}
            </span>
            <span className={theme.sectionTitles}>
              {title}
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
        { !collapsed && <hr className={theme.divider} /> }
      </div>
    )
  }
}

CardSectionTwoLinesTitle.propTypes = {
  /**
   * Changes the component style
   */
  collapsed: PropTypes.bool,
  /**
   * Section Icon that appears in the top left hand corner of the tittle
   */
  icon: PropTypes.element,
  /**
   * Default icons received by theme. These icons are used in the toggle function
   * trigged on the onClick function.
   */
  icons: PropTypes.shape({
    collapse: PropTypes.element,
    expand: PropTypes.element,
  }),
  /**
   * Callback triggered when it receives a click.
   * @param {bool} collapsed
   */
  onClick: PropTypes.func,
  /**
   * Main component text
   */
  title: PropTypes.string.isRequired,
  /**
   * Subtitle inside the section.
   */
  subtitle: PropTypes.node,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    /**
     * The expand/collapse arrow icon class
     */
    arrow: PropTypes.string,
    /**
     * The class applied when the title is clickable (onClick is set)
     */
    clickableTitle: PropTypes.string,
    /**
     * The divider (hr element) class name
     */
    divider: PropTypes.string,
    /**
     * The icon outer box class
     */
    sectionIconBox: PropTypes.string,
    /**
     * The section subtitle class
     */
    sectionSubtitle: PropTypes.string,
    /**
     * The section title class
     */
    sectionTitle: PropTypes.string,
    /**
     * The vertical aligned titles class name
     */
    sectionTitles: PropTypes.string,
  }),
}

CardSectionTwoLinesTitle.defaultProps = {
  collapsed: false,
  icon: null,
  icons: {},
  onClick: null,
  subtitle: null,
  theme: {},
}

export default consumeTheme(CardSectionTwoLinesTitle)
