import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ThemeConsumer from '../ThemeConsumer'
import Button from '../Button'

const consumeTheme = ThemeConsumer('UICard')

const getArrowIcon = (props) => {
  const {
    collapsed,
    icons: { collapse, expand },
  } = props

  if (collapsed) {
    return expand
  }

  return collapse
}

const CardSectionDoubleLineTitle = ({
  actions,
  collapsed,
  icon,
  icons,
  onClick,
  subtitle,
  theme,
  title,
}) => {
  const headerClassNames = classNames(
    theme.sectionDoubleLineTitle,
    {
      [theme.clickableTitle]: onClick,
    }
  )

  return (
    <div className={headerClassNames}>
      <div className={theme.doubleLineHead}>
        <div className={theme.doubleLineTitle}>
          <span className={theme.sectionIconBox}>
            {icon}
          </span>
          <span className={theme.sectionTitles}>
            {title}
            <span className={theme.sectionSubtitle}>
              {subtitle}
            </span>
          </span>
        </div>
        <div className={theme.actionDoubleLine}>
          {actions}
          <Button
            fill="outline"
            icon={getArrowIcon({ collapsed, icons })}
            onClick={onClick}
            relevance="low"
            size="default"
            type="button"
          />
        </div>
      </div>
      { !collapsed && <hr /> }
    </div>
  )
}

CardSectionDoubleLineTitle.propTypes = {
  /**
   * Actions items.
   */
  actions: PropTypes.node,
  /**
   * Changes the component style
   */
  collapsed: PropTypes.bool,
  /**
   * Section Icon that appears in the top left hand corner of the tittle.
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
  onClick: PropTypes.func.isRequired,
  /**
   * Subtitle inside the section.
   */
  subtitle: PropTypes.node,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    /**
     * The action double line class.
     */
    actionDoubleLine: PropTypes.string,
    /**
     * The expand/collapse arrow icon class.
     */
    arrow: PropTypes.string,
    /**
     * The class applied when the title is clickable (onClick is set).
     */
    clickableTitle: PropTypes.string,
    /**
     * The divider (hr element) class name.
     */
    divider: PropTypes.string,
    /**
     * The doubline title line head class.
     */
    doubleLineHead: PropTypes.string,
    /**
     * The doubline title class.
     */
    doubleLineTitle: PropTypes.string,
    /**
     * The section double title class.
     */
    sectionDoubleLineTitle: PropTypes.string,
    /**
     * The icon outer box class.
     */
    sectionIconBox: PropTypes.string,
    /**
     * The section subtitle class name.
     */
    sectionSubtitle: PropTypes.string,
    /**
     * The vertical aligned titles class name.
     */
    sectionTitles: PropTypes.string,
  }),
  /**
   * Main component text.
   */
  title: PropTypes.string.isRequired,
}

CardSectionDoubleLineTitle.defaultProps = {
  actions: null,
  collapsed: false,
  icon: null,
  icons: {},
  subtitle: null,
  theme: {},
}

export default consumeTheme(CardSectionDoubleLineTitle)
