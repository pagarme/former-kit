import React from 'react'
import { element, shape, string } from 'prop-types'
import classNames from 'classnames'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UITypeset')

const Typeset = ({ children, theme }) => {
  const child = React.Children.only(children)
  const { className } = children.props

  return React.cloneElement(
    child,
    { className: classNames(className, theme.typography) }
  )
}

Typeset.propTypes = {
  theme: shape({
    typography: string,
  }),
  children: element.isRequired,
}

Typeset.defaultProps = {
  theme: {},
}

export default consumeTheme(Typeset)
