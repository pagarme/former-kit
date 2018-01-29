import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIHeader')

const HeaderMenu = ({
  children,
  theme,
  onClick,
  icon,
}) => (
  <div
    className={theme.menu}
    onClick={onClick}
    role="button"
    tabIndex="0"
  >
    {children}
    {icon}
  </div>
)

HeaderMenu.propTypes = {
  theme: PropTypes.shape({
    menu: PropTypes.string,
  }),
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  icon: PropTypes.element.isRequired,
}

HeaderMenu.defaultProps = {
  theme: {},
}

export default consumeTheme(HeaderMenu)