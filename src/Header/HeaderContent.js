import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIHeader')

const HeaderContent = ({
  children,
  theme,
}) => (
  <div className={theme.content}>
    {children}
  </div>
)

HeaderContent.propTypes = {
  theme: PropTypes.shape({
    content: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
}

HeaderContent.defaultProps = {
  theme: {},
}

export default consumeTheme(HeaderContent)
