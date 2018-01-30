import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIHeader')

const HeaderMenu = ({
  children,
  theme,
  onClick,
  icons,
}) => (
  <button
    className={theme.menu}
    onClick={onClick}
    role="link"
  >
    {children}
    {icons.expand}
  </button>
)

HeaderMenu.propTypes = {
  theme: PropTypes.shape({
    menu: PropTypes.string,
  }),
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  icons: PropTypes.shape({
    expand: PropTypes.element,
  }),
}

HeaderMenu.defaultProps = {
  theme: {},
  icons: {},
}

export default consumeTheme(HeaderMenu)
