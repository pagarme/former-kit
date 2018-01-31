import React from 'react'
import theme from 'former-kit-skin-pagarme' // eslint-disable-line

import ThemeProvider from '../src/ThemeProvider'
import Typeset from '../src/Typeset'

export default ({children}) => ( // eslint-disable-line
  <ThemeProvider theme={theme}>
    <Typeset>
      {children}
    </Typeset>
  </ThemeProvider>
)
