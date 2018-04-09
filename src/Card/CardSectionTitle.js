import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UICard')

class CardSectionTitle extends Component {
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
      theme.sectionTitle,
      {
        [theme.clickableTitle]: onClick,
      }
    )

    return (
      <div className={headerClassNames} {...headerProps}>
        <span>
          {title}
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
}

CardSectionTitle.propTypes = {
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
     * The section subtitle class
     */
    sectionSubtitle: PropTypes.string,
    /**
     * The section title class
     */
    sectionTitle: PropTypes.string,
  }),
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
   * Subtitle inside the section.
   */
  subtitle: PropTypes.node,
  /**
   * Main component text
   */
  title: PropTypes.string.isRequired,
}

CardSectionTitle.defaultProps = {
  theme: {},
  collapsed: false,
  icon: null,
  icons: {},
  onClick: null,
  subtitle: null,
}

export default consumeTheme(CardSectionTitle)
