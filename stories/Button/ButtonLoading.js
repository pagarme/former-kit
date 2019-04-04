import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from '../../src/Button'

const ButtonLoading = ({ children, ...props }) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let timer
    if (loading) {
      timer = setTimeout(() => setLoading(false), 3000)
    }
    return () => {
      clearTimeout(timer)
    }
  })

  return (
    <Button
      loading={loading || props.loading}
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
