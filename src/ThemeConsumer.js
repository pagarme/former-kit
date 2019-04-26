import React from 'react'
import { object } from 'prop-types'

/**
 * This component is a wrapper component wich read the data received from
 * a `ThemeProvider` and pass this data to the wrapped component props.
 * This wrapper is applied to all of components which apply the
 * `consumeTheme` function.
 */
export default function ThemeConsumer (name) {
  return (Component) => {
    const themed = function Themed (props, { theme }) {
      const {
        styles = {},
        icons = {},
      } = theme || {}

      return (
        <Component
          theme={styles[name]}
          icons={icons[name]}
          {...props}
        />
      )
    }

    themed.contextTypes = {
      /**
       * It's provided by the theme provider and this wrapper consume this
       * passing the `theme` and `icons` objects as props to the child component.
       * @see [ThemeProvider](#themeprovider)
       */
      theme: object, // eslint-disable-line react/forbid-prop-types
    }

    Object.defineProperty(
      themed,
      'name',
      { get: () => `Themed${Component.name}` }
    )

    return themed
  }
}

