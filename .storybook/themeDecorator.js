import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import theme from 'former-kit-skin-pagarme'

import ThemeProvider from '../src/ThemeProvider'
import Typeset from '../src/Typeset'

const ThemeDecorator = (storyFn) => (
  <ThemeProvider theme={theme}>
    <Typeset>
      {storyFn()}
    </Typeset>
  </ThemeProvider>
)

addDecorator(ThemeDecorator)

