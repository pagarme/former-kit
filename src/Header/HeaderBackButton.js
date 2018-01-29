import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIHeader')

const HeaderBackButton = ({
  icon,
  onClick,
  theme,
}) => (
  <button className={theme.backButton} onClick={onClick}>
    {icon}
  </button>
)

HeaderBackButton.propTypes = {
  theme: PropTypes.shape({
    backButton: PropTypes.string,
  }),
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
}

HeaderBackButton.defaultProps = {
  theme: {},
}

export default consumeTheme(HeaderBackButton)
