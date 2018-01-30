import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIHeader')

const HeaderLink = ({
  theme,
  onClick,
  icon,
  children,
}) => (
  <button
    onClick={onClick}
    role="link"
    className={theme.link}
  >
    {icon || children}
  </button>
)

HeaderLink.propTypes = {
  theme: PropTypes.shape({
    link: PropTypes.string,
  }),
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.element,
  children: PropTypes.node,
}

HeaderLink.defaultProps = {
  theme: {},
  icon: null,
  children: null,
}

export default consumeTheme(HeaderLink)
