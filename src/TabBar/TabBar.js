import React from 'react'

import {
  number,
  func,
  oneOf,
  arrayOf,
  shape,
  string,
} from 'prop-types'

import { themr } from 'react-css-themr'
import shortid from 'shortid'

import {
  variantList,
  variantDefault,
} from './shapes'

import TabItem from './TabItem'

const applyThemr = themr('UITabBar')

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
  theme: shape({
    tabBar: string,
    tabs: string,
    content: string,
  }),
  variant: oneOf(variantList),
  children: arrayOf(TabItem).isRequired,
  selected: number,
  onTabChange: func,
}

TabBar.defaultProps = {
  theme: {},
  variant: variantDefault,
  selected: 0,
  onTabChange: null,
}

export default applyThemr(TabBar)
