import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIAvatar')

/**
 * Avatar is used to render a profile pictur. It includes a fallback
 * to a custom placeholder.
 */
const Avatar = ({
  theme,
  photo,
  size,
  icons,
}) => {
  if (photo) {
    return (
      <img
        src={photo}
        alt="Foto de perfil"
        width={size}
        height={size}
        className={theme.avatar}
      />
    )
  }

  return (
    <div className={classnames(theme.avatar, theme.placeholder)}>
      {icons.placeholder}
    </div>
  )
}

Avatar.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from consumeTheme wrapper.
   */
  theme: PropTypes.shape({
    avatar: PropTypes.string,
    placeholder: PropTypes.string,
  }),
  /**
   * Width and height of the Avatar.
   */
  size: PropTypes.number,
  /**
   * Path to image, if you don't use this props the component will use
   * `icons.placeholder` instead.
   */
  photo: PropTypes.string,
  icons: PropTypes.shape({
    /**
     * Placeholder will used only if no photo has used.
     */
    placeholder: PropTypes.element,
  }),
}

Avatar.defaultProps = {
  theme: {},
  photo: null,
  size: 26,
  icons: {},
}

export default consumeTheme(Avatar)
