import React from 'react'
import PropTypes from 'prop-types'
import theme from 'former-kit-skin-pagarme'

import ThemeProvider from '../../src/ThemeProvider'
import Typeset from '../../src/Typeset'

const Wrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Typeset>
      { children }
    </Typeset>
  </ThemeProvider>
)

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Wrapper
