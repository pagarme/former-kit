import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIHeader')

const HeaderBackButton = ({
  icons,
  onClick,
  theme,
}) => (
  <button className={theme.backButton} onClick={onClick}>
    {icons.back}
  </button>
)

HeaderBackButton.propTypes = {
  theme: PropTypes.shape({
    backButton: PropTypes.string,
  }),
  icons: PropTypes.shape({ back: PropTypes.element }),
  onClick: PropTypes.func.isRequired,
}

HeaderBackButton.defaultProps = {
  theme: {},
  icons: {},
}

export default consumeTheme(HeaderBackButton)
