import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './style.css'

const Section = ({
  title,
  children,
  className,
}) => (
  <section className={classnames(styles.section, className)}>
    {title &&
      <h2>{title}</h2>
    }
    <div>{children}</div>
  </section>
)

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
}

Section.defaultProps = {
  title: '',
}

export default Section
