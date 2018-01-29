import React from 'react'
import { object } from 'prop-types'

export default function ThemeConsumer (name) {
  return (Component) => {
    const themed = function Themed (props, context) {
      const theme = context.theme ? context.theme.theme : {}

      return (
        <Component
          theme={theme[name]}
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

