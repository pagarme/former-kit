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
  <div
    onClick={onClick}
    role="button"
    tabIndex="0"
    className={theme.link}
  >
    {icon || children}
  </div>
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
