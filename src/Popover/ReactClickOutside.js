
import hoistNonReactStatic from 'hoist-non-react-statics'
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

function enhanceWithClickOutside (Component) {
  const componentName = Component.displayName || Component.name

  class EnhancedComponent extends React.Component {
    constructor (props) {
      super(props)
      this.handleClickOutside = this.handleClickOutside.bind(this)

      this.domNode = null
      this.wrappedInstance = null
    }

    componentDidMount () {
      document.addEventListener('click', this.handleClickOutside, true)
    }

    componentWillUnmount () {
      document.removeEventListener('click', this.handleClickOutside, true)
    }

    handleClickOutside (e) {
      const { domNode } = this

      let target = e && e.target

      if (e && e.composedPath && e.composedPath().length > 0) {
        [target] = e.composedPath()
      }

      if (
        (!domNode || !domNode.contains(target))
        && this.wrappedInstance
        && typeof this.wrappedInstance.handleClickOutside === 'function'
      ) {
        this.wrappedInstance.handleClickOutside(e)
      }
    }

    render () {
      const { wrappedRef, ...rest } = this.props

      return (
        <Component
          {...rest}
          ref={(c) => {
            this.wrappedInstance = c
            this.domNode = ReactDOM.findDOMNode(c) // eslint-disable-line react/no-find-dom-node
            if (wrappedRef) {
              wrappedRef(c)
            }
          }}
        />
      )
    }
  }

  EnhancedComponent.displayName = `clickOutside(${componentName})`

  EnhancedComponent.propTypes = {
    ...Component.propTypes,
    wrappedRef: PropTypes.node,
  }

  EnhancedComponent.defaultProps = {
    ...Component.defaultProps,
  }

  return hoistNonReactStatic(EnhancedComponent, Component)
}

module.exports = enhanceWithClickOutside
