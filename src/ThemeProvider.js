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

/**
 * This object is a compiled of styles which came from the provided theme.
 * All theme props are strings which mirror the theme css classes.
 * In wrapped components props this object can be acceced by the `theme` prop.
 * @typedef {object} Styles
 */

/**
 * This object is a set of icons provided in the theme object.
 * The icons are all react elements which have an icon inside,
 * In wrapped components props this object can be acceced by the `icons` prop.
 * @typedef {object} Icons
 */

/**
 * A magical object received by the provider and passed to all children
 * it's responsible for all css and icons default customizations, uses
 * the react context api to propagate it own props to children.
 *
 * @typedef {object} Theme
 * @prop {Style} styles
 * @prop {Icons} icons
 * @prop {string} name
 * @prop {string} version
 */

ThemeProvider.childContextTypes = {
  /**
   * @type {Theme} -theme
   */
  theme: shape({
    name: string,
    version: string,
    styles: object, // eslint-disable-line
    icons: object, // eslint-disable-line
  }),
}

ThemeProvider.propTypes = {
  /**
   * @type {Theme} -theme
   */
  theme: shape({
    name: string,
    version: string,
    styles: object, // eslint-disable-line
    icons: object, // eslint-disable-line
  }).isRequired,
  children: node.isRequired,
}
