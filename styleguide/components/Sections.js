import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'rsg-components/Styled'

const styles = () => ({
  // Just default jss-isolate rules
  root: { flex: '1 0 auto' },
})

const SectionsRenderer = ({ classes, children }) => (
  <section className={classes.root}>
    {children}
  </section>
)

SectionsRenderer.propTypes = {
  classes: PropTypes.shape({ root: PropTypes.string.isRequired }).isRequired,
  children: PropTypes.node.isRequired,
}

export default Styled(styles)(SectionsRenderer)
