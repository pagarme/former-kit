import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIHeader')

/* The button that is used to go back to
 * another page level
 */
const HeaderBackButton = ({
  icons,
  onClick,
  theme,
}) => (
  <button
    className={theme.backButton}
    onClick={onClick}
    type="button"
  >
    {icons.back}
  </button>
)

HeaderBackButton.propTypes = {
  /**
   * The icon theme for this element.
   */
  icons: PropTypes.shape({
    /**
     * The icon used in the return button.
     */
    back: PropTypes.element,
  }),
  /**
   * The onClick callback.
   * The callback may be used to go to another page level.
   * It receives the 'event' object as an argument.
   * @param {object} event - the default event object.
   */
  onClick: PropTypes.func.isRequired,
  /**
   * The style classes for this element.
   */
  theme: PropTypes.shape({
    /**
     * The main class used to style the element.
     */
    backButton: PropTypes.string,
  }),
}

HeaderBackButton.defaultProps = {
  icons: {},
  theme: {},
}

export default consumeTheme(HeaderBackButton)
