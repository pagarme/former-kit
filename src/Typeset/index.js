import React from 'react'
import { element, shape, string } from 'prop-types'
import classNames from 'classnames'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UITypeset')
/**
 * This component is designed to inject the theme typography class
 * in the className props of its children
 */
const Typeset = ({ children, theme }) => {
  const child = React.Children.only(children)
  const { className } = children.props

  return React.cloneElement(
    child,
    { className: classNames(className, theme.typography) }
  )
}

Typeset.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from consumeTheme wrapper
   */
  theme: shape({
    typography: string,
  }),
  /**
   * React element which will be rendered with the typography class.
   */
  children: element.isRequired,
}

Typeset.defaultProps = {
  theme: {},
}

export default consumeTheme(Typeset)
