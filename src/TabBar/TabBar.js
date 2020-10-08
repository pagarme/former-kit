import React from 'react'
import {
  arrayOf,
  func,
  number,
  oneOf,
  shape,
  string,
} from 'prop-types'
import shortid from 'shortid'
import classnames from 'classnames'

import {
  variantList,
  variantDefault,
} from './shapes'

import ThemeConsumer from '../ThemeConsumer'
import TabItem from './TabItem'

const consumeTheme = ThemeConsumer('UITabBar')
/**
 * A horizontal select which shows all options side by side,
 * only one option is selected at time, this one is highlighted.
 */
class TabBar extends React.Component {
  constructor (props) {
    super(props)
    this.instanceId = `tabbar-${shortid.generate()}`
    this.cloneChild = this.cloneChild.bind(this)
  }

  getContent () {
    const { children, selected } = this.props
    const selectedChild = children[selected]
    return selectedChild.props.children
  }

  cloneChild (tabItemChild, index) {
    const { onTabChange, selected, variant } = this.props
    return React.cloneElement(
      tabItemChild,
      {
        id: `${this.instanceId}-tab-${index}`,
        index,
        instanceId: this.instanceId,
        key: index,
        onTabChange,
        selected: selected === index,
        variant,
      }
    )
  }

  populateChildren () {
    const { children } = this.props
    return React.Children.map(
      children,
      this.cloneChild
    )
  }

  render () {
    const { align, theme } = this.props

    return (
      <div className={theme.tabBar}>
        <div className={classnames(theme.tabs, theme[align])}>
          {this.populateChildren()}
        </div>
        <div className={theme.content}>
          {this.getContent()}
        </div>
      </div>
    )
  }
}

TabBar.propTypes = {
  /**
   * Set the align of the TabBar.
   */
  align: oneOf(['start', 'center', 'end']),
  /**
   * Set of React components which will be rendered inside the component.
   */
  children: arrayOf(TabItem).isRequired,
  /**
   * Triggers when a component.
   */
  onTabChange: func,
  /**
   * Selected item index.
   */
  selected: number,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: shape({
    content: string,
    tabBar: string,
    tabs: string,
    start: string,
    end: string,
    center: string,
  }),
  /**
   * Component structure variant which can be: just-text, text-icon, just-icon.
   * This changes the way which every item will be rendered in the component.
   */
  variant: oneOf(variantList),
}

TabBar.defaultProps = {
  align: 'center',
  onTabChange: null,
  selected: 0,
  theme: {},
  variant: variantDefault,
}

export default consumeTheme(TabBar)
