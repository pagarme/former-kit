import React from 'react'
import classNames from 'classnames'

import {
  bool,
  element,
  func,
  number,
  oneOf,
  shape,
  string,
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

    this.handleBlur = this.handleBlur.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.state = {
      isFocused: false,
    }
  }

  handleBlur () {
    const { onBlur } = this.props
    this.setState({
      isFocused: false,
    })
    if (onBlur) {
      onBlur()
    }
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

  handleFocus () {
    const { onFocus } = this.props
    this.setState({
      isFocused: true,
    })
    if (onFocus) {
      onFocus()
    }
  }

  render () {
    const {
      icon,
      id,
      instanceId,
      selected,
      text,
      theme,
      variant,
    } = this.props
    const { isFocused } = this.state
    const className = classNames(
      theme.tab,
      theme[variant],
      {
        [theme.focused]: isFocused,
        [theme.selected]: selected,
      }
    )

    return (
      <label
        className={className}
        htmlFor={id}
      >
        <input
          type="radio"
          id={id}
          name={instanceId}
          checked={selected}
          onBlur={this.handleBlur}
          onChange={this.handleClick}
          onFocus={this.handleFocus}
        />
        {variant !== 'just-text' && (
          <div className={theme.icon}>
            {icon}
          </div>
        )}
        {variant !== 'just-icon' && text}
      </label>
    )
  }
}

TabItem.propTypes = {
  icon: element,
  id: string,
  index: number,
  instanceId: string,
  onBlur: func,
  onClick: func,
  onFocus: func,
  onTabChange: func,
  selected: bool,
  text: string,
  theme: shape({
    focused: string,
    icon: string,
    selected: string,
    tab: string,
  }),
  variant: oneOf(variantList),
}

TabItem.defaultProps = {
  icon: null,
  id: null,
  index: null,
  instanceId: null,
  onBlur: null,
  onClick: null,
  onFocus: null,
  onTabChange: null,
  selected: false,
  text: null,
  theme: {},
  variant: variantDefault,
}

export default consumeTheme(TabItem)
