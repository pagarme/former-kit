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

