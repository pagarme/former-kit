import React from 'react'
import {
  number,
  func,
  oneOf,
  arrayOf,
  shape,
  string,
} from 'prop-types'
import shortid from 'shortid'

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
    const selected = this.props.children[this.props.selected]
    return selected.props.children
  }

  cloneChild (tabItemChild, index) {
    return React.cloneElement(
      tabItemChild,
      {
        id: `${this.instanceId}-tab-${index}`,
        index,
        variant: this.props.variant,
        onTabChange: this.props.onTabChange,
        selected: this.props.selected === index,
        key: index,
      }
    )
  }

  populateChildren () {
    return React.Children.map(
      this.props.children,
      this.cloneChild
    )
  }

  render () {
    const { theme } = this.props

    return (
      <div className={theme.tabBar}>
        <div className={theme.tabs}>
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
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: shape({
    tabBar: string,
    tabs: string,
    content: string,
  }),
  /**
   * Component structure variant which can be: just-text, text-icon, just-icon.
   * This changes the way which every item will be rendered in the component.
   */
  variant: oneOf(variantList),
  /**
   * Set of React components which will be rendered inside the component.
   */
  children: arrayOf(TabItem).isRequired,
  /**
   * Selected item index.
   */
  selected: number,
  /**
   * Triggers when a component.
   */
  onTabChange: func,
}

TabBar.defaultProps = {
  theme: {},
  variant: variantDefault,
  selected: 0,
  onTabChange: null,
}

export default consumeTheme(TabBar)
