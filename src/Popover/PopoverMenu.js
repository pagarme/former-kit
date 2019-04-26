import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

const ConsumeTheme = ThemeConsumer('UIPopover')

const PopoverMenu = ({
  items,
  theme,
}) => (
  <div className={theme.menu}>
    {
      items.map(({ action, title }) => (
        <button
          className={theme.link}
          key={title}
          onClick={action}
          type="button"
        >
          { title }
        </button>
      ))
    }
  </div>
)

PopoverMenu.propTypes = {
  /**
   * The items of menu.
   */
  items: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.func,
    title: PropTypes.string.isRequired,
  })).isRequired,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    link: PropTypes.string,
    menu: PropTypes.string,
  }),
}

PopoverMenu.defaultProps = {
  theme: {},
}

export default ConsumeTheme(PopoverMenu)
