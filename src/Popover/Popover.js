import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ClickOutside from 'react-click-outside'

import ThemeConsumer from '../ThemeConsumer'

const ConsumeTheme = ThemeConsumer('UIPopover')

class Popover extends Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: this.props.visible,
    }

    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentWillReceiveProps ({ visible }) {
    this.setState({
      visible,
    })
  }

  handleClickOutside () {
    this.setState({
      visible: false,
    })
  }

  handleOnClick () {
    const { onClick } = this.props

    if (!onClick) {
      this.setState({
        visible: !this.state.visible,
      })
    }

    if (onClick) {
      onClick()
    }
  }

  render () {
    const {
      base,
      children,
      content,
      placement,
      theme,
    } = this.props

    const { visible } = this.state

    return (
      <div
        className={theme.target}
        onClick={this.handleOnClick}
        role="presentation"
      >
        {children}

        {(visible) &&
          <div className={classNames(theme.popover, theme[base], theme[placement])}>
            {content}
          </div>
        }
      </div>
    )
  }
}

Popover.propTypes = {
  /**
    * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
    */
  theme: PropTypes.shape({
    base: PropTypes.string,
    popover: PropTypes.string,
    target: PropTypes.string,
  }),
  /**
   * Popover base theme.
   */
  base: PropTypes.string,
  /**
   * The element that will receive popover
   */
  children: PropTypes.node.isRequired,
  /**
   * The popover content.
   */
  content: PropTypes.node.isRequired,
  /**
   * on click function.
   */
  onClick: PropTypes.func,
  /**
   * The popover position when it's visible
   */
  placement: PropTypes.string,
  /**
   * The prop that indicates if the popover is visible or not.
   */
  visible: PropTypes.bool,
}

Popover.defaultProps = {
  base: null,
  onClick: null,
  placement: 'bottomStart',
  theme: {},
  visible: false,
}

export default ConsumeTheme(ClickOutside(Popover))
