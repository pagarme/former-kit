import React from 'react'
import PropTypes from 'prop-types'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UITag')

const Tag = ({
  theme,
  children,
}) => (
  <div className={theme.tag}>
    {children}
  </div>
)

Tag.propTypes = {
  theme: PropTypes.shape({
    tag: PropTypes.string,
  }),
  children: PropTypes.string.isRequired,
}

Tag.defaultProps = {
  theme: {},
}

export default consumeTheme(Tag)
