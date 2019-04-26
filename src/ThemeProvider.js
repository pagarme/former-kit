import React from 'react'
import {
  shape,
  string,
  node,
  object,
} from 'prop-types'

/**
 * Apply the theme to UI.
 */
export default class ThemeProvider extends React.Component {
  getChildContext () {
    const { theme } = this.props
    return { theme }
  }

  render () {
    const { children } = this.props
    return children
  }
}

ThemeProvider.childContextTypes = {
  /**
   * A magical object received by the provider and passed to all of its children.
   * It's responsible for all CSS and icons default customizations, uses
   * the React context API to propagate it own props to the children.
   */
  theme: shape({
    /**
     * Theme name/description.
     */
    name: string,
    /**
     * Theme version.
     */
    version: string,
    /**
     * This object is a compiled of styles which came from the provided theme.
     * All of the theme props are strings which mirror the theme CSS classes.
     * In wrapped components props, this object can be accessed by the `theme` prop.
     */
    styles: object, // eslint-disable-line
    /**
     * This object is a set of icons provided in the theme object.
     * The icons are all React elements which have an icon inside.
     * In wrapped components props, this object can be accessed by the `icons` prop.
     */
    icons: object, // eslint-disable-line
  }),
}

ThemeProvider.propTypes = {
  children: node.isRequired,
  theme: shape({
    name: string,
    version: string,
    styles: object, // eslint-disable-line
    icons: object, // eslint-disable-line
  }).isRequired,
}
