import React from 'react'
import PropTypes from 'prop-types'
import styles from './style.css'

const Section = ({
  title,
  children,
}) => (
  <section className={styles.section}>
    <h2>{title}</h2>
    <div>{children}</div>
  </section>
)

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Section
