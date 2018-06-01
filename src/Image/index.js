import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { omit } from 'ramda'

/**
 * Image component renders an image if the src is a valid path,
 * otherwise it renders a node fallback.
 */
class Image extends Component {
  constructor () {
    super()

    this.state = {
      errored: false,
    }

    this.handleError = this.handleError.bind(this)
  }

  handleError () {
    this.setState({
      errored: true,
    })
  }

  render () {
    const props = omit(
      [
        'fallback',
        'onError',
        'source',
        'src',
      ],
      this.props
    )

    const {
      fallback,
      source,
    } = this.props

    if (this.state.errored) {
      return fallback
    }

    return (
      <img // eslint-disable-line jsx-a11y/alt-text
        onError={this.handleError}
        src={source}
        {...props}
      />
    )
  }
}

Image.propTypes = {
  /**
   * An element to render if image has an error.
   */
  fallback: PropTypes.node,
  /**
   * The url for an image.
   */
  source: PropTypes.string,
}

Image.defaultProps = {
  fallback: null,
  source: '',
}

export default Image
