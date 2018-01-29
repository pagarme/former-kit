import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIHeader')

const HeaderTitle = ({
  children,
  theme,
}) => (
  <h1 className={theme.title}>{children}</h1>
)

HeaderTitle.propTypes = {
  theme: PropTypes.shape({
    title: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
}

HeaderTitle.defaultProps = {
  theme: {},
}

export default consumeTheme(HeaderTitle)
