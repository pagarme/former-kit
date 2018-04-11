import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const ConsumeTheme = ThemeConsumer('UITooltip')

const contentClassNames = (theme, placement) => classNames(theme.tooltip, {
  [theme.bottomCenter]: placement === 'bottomCenter',
  [theme.bottomEnd]: placement === 'bottomEnd',
  [theme.bottomStart]: placement === 'bottomStart',
  [theme.leftEnd]: placement === 'leftEnd',
  [theme.leftMiddle]: placement === 'leftMiddle',
  [theme.leftStart]: placement === 'leftStart',
  [theme.rightEnd]: placement === 'rightEnd',
  [theme.rightMiddle]: placement === 'rightMiddle',
  [theme.rightStart]: placement === 'rightStart',
  [theme.topCenter]: placement === 'topCenter',
  [theme.topEnd]: placement === 'topEnd',
  [theme.topStart]: placement === 'topStart',
})

class Tooltip extends Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: false,
    }

    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  handleMouseEnter () {
    this.setState({
      visible: true,
    })
  }

  handleMouseLeave () {
    this.setState({
      visible: false,
    })
  }

  render () {
    const {
      children,
      content,
      placement,
      theme,
      visible: visibleProp,
    } = this.props

    const { visible: visibleState } = this.state

    return (
      <div
        className={theme.target}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        { children }
        {(visibleState || visibleProp) &&
          <div
            className={contentClassNames(theme, placement)}
            role="tooltip"
          >
            {content}
          </div>
        }
      </div>
    )
  }
}

Tooltip.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    bottomCenter: PropTypes.string,
    bottomEnd: PropTypes.string,
    bottomStart: PropTypes.string,
    leftEnd: PropTypes.string,
    leftMiddle: PropTypes.string,
    leftStart: PropTypes.string,
    rightEnd: PropTypes.string,
    rightMiddle: PropTypes.string,
    rightStart: PropTypes.string,
    target: PropTypes.string,
    tooltip: PropTypes.string,
    topCenter: PropTypes.string,
    topEnd: PropTypes.string,
    topStart: PropTypes.string,
  }),
  /**
   * The children can be any kind of component.
   */
  children: PropTypes.node.isRequired,
  /**
   * The content is used to tooltip and can be any kind of component.
   */
  content: PropTypes.node.isRequired,
  /**
   * The position you want to render the tooltip when it's visible.
   */
  placement: PropTypes.string,
  /**
   * This props mean the tooltip is visible.
   */
  visible: PropTypes.bool,
}

Tooltip.defaultProps = {
  placement: 'leftMiddle',
  theme: {},
  visible: false,
}

export default ConsumeTheme(Tooltip)
