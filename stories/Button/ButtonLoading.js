import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../../src/Button'

const ButtonLoading = ({ children, ...props }) => {
  const [loading, setLoading] = useState(false)

  // meh
  if (loading) {
    setTimeout(() => setLoading(false), 3000)
  }

  return (
    <Button
      loading={loading}
      onClick={() => setLoading(!loading)}
      {...props}
    >
      { children }
    </Button>
  )
}

ButtonLoading.propTypes = {
  children: PropTypes.node,
}

ButtonLoading.defaultProps = {
  children: null,
}

export default ButtonLoading
