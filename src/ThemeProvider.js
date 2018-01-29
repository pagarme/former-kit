import React from 'react'
import {
  shape,
  string,
  node,
  object,
} from 'prop-types'

export default class ThemeProvider extends React.Component {
  getChildContext () {
    const { theme } = this.props
    return { theme }
  }

  render () {
    return this.props.children
  }
}

ThemeProvider.childContextTypes = {
  theme: shape({
    name: string,
    version: string,
    theme: object, // eslint-disable-line
  }),
}

ThemeProvider.propTypes = {
  theme: shape({
    name: string,
    version: string,
    theme: object, // eslint-disable-line
  }).isRequired,
  children: node.isRequired,
}
