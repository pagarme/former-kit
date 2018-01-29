import React from 'react'
import classNames from 'classnames'

import {
  number,
  bool,
  func,
  element,
  string,
  shape,
  oneOf,
} from 'prop-types'

import ThemeConsumer from '../ThemeConsumer'

import {
  variantList,
  variantDefault,
} from './shapes'

const consumeTheme = ThemeConsumer('UITabBar')

class TabItem extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    const {
      index,
      onClick,
      onTabChange,
    } = this.props

    if (onTabChange) {
      onTabChange(index)
    }

    if (onClick) {
      onClick()
    }
  }

  render () {
    const {
      id,
      variant,
      selected,
      icon,
      text,
      theme,
    } = this.props

    const className = classNames(
      theme.tab,
      theme[variant],
      { [theme.selected]: selected }
    )

    return (
      <label
        className={className}
        htmlFor={id}
      >
        <input
          type="radio"
          id={id}
          name={id}
          checked={selected}
          onChange={this.handleClick}
        />
        {variant !== 'just-text' &&
          <div className={theme.icon}>
            {icon}
          </div>
        }
        {variant !== 'just-icon' && text}
      </label>
    )
  }
}

TabItem.propTypes = {
  theme: shape({
    tab: string,
    selected: string,
    icon: string,
  }),
  id: string,
  index: number,
  selected: bool,
  onTabChange: func,
  onClick: func,
  icon: element,
  text: string,
  variant: oneOf(variantList),
}

TabItem.defaultProps = {
  theme: {},
  id: null,
  index: null,
  selected: false,
  onTabChange: null,
  onClick: null,
  icon: null,
  text: null,
  variant: variantDefault,
}

export default consumeTheme(TabItem)
