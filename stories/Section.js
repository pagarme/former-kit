import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './style.css'

const Section = ({
  base,
  children,
  className,
  title,
}) => (
  <section className={
    classnames(
      styles[base],
      styles.section,
      className
    )}
  >
    {title && <h2>{title}</h2>}
    <div>{children}</div>
  </section>
)

Section.propTypes = {
  base: PropTypes.oneOf([
    'light',
    'dark',
  ]),
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
}

Section.defaultProps = {
  base: 'light',
  title: '',
}

export default Section
