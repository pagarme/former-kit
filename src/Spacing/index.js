import React from 'react'
import {
  oneOf,
  shape,
  string,
} from 'prop-types'
import classNames from 'classnames'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UISpacing')

/**
 * This component creates a space between elements.
 */
const Spacing = ({
  size,
  theme,
}) => (
  <div className={classNames(theme.spacing, {
      [theme[size]]: size,
    })}
  />
)

Spacing.propTypes = {
  /**
   * The component's size.
   */
  size: oneOf([
    'flex',
    'tiny',
    'medium',
    'small',
    'large',
  ]),
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: shape({
    flex: string,
    large: string,
    medium: string,
    small: string,
    spacing: string,
    tiny: string,
  }),
}

Spacing.defaultProps = {
  size: 'flex',
  theme: {},
}

export default consumeTheme(Spacing)
