import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './style.css'

const Section = ({
  base,
  title,
  children,
  className,
}) => (
  <section className={
    classnames(
      styles[base],
      styles.section,
      className)}
  >
    {title &&
      <h2>{title}</h2>
    }
    <div>{children}</div>
  </section>
)

Section.propTypes = {
  base: PropTypes.oneOf([
    'light',
    'dark',
  ]),
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
}

Section.defaultProps = {
  base: 'light',
  title: '',
}

export default Section
