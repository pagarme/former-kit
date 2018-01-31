import React from 'react'
import { object } from 'prop-types'

export default function ThemeConsumer (name) {
  return (Component) => {
    const themed = function Themed (props, context) {
      const {
        styles = {},
        icons = {},
      } = context.theme ? context.theme : {}

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
       * It's provided by the theme provider and this wrapepr consume this
       * passing the `theme` and `icons` objects as props to the child component.
       * This wrapper is applyed to all components in this library using the
       * consumeTheme function in the components.
       *
       * @type {Theme} theme
       * @prop {Styles} styles
       * @prop {Icons} icons
       */
      theme: object,
    }

    Object.defineProperty(
      themed,
      'name',
      { get: () => `Themed${Component.name}` }
    )

    return themed
  }
}

