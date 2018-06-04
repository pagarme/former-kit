import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Image from '../Image'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIAvatar')

/**
 * Avatar is used to render a profile picture. It includes a fallback
 * to a custom placeholder.
 */
const Avatar = ({
  alt,
  icons,
  photo,
  size,
  theme,
}) => (
  <Image
    alt={alt}
    className={theme.avatar}
    fallback={
      <div className={classNames(theme.avatar, theme.placeholder)}>
        { icons.placeholder }
      </div>
    }
    height={size}
    source={photo}
    width={size}
  />
)

Avatar.propTypes = {
  /**
   * Image alt text.
   */
  alt: PropTypes.string.isRequired,
  icons: PropTypes.shape({
    /**
     * The placeholder will be used only if `photo` is not defined.
     */
    placeholder: PropTypes.element,
  }),
  /**
   * The path to an image. If this prop is not used, the component will use
   * `icons.placeholder` instead.
   */
  photo: PropTypes.string,
  /**
   * Width and height of the Avatar.
   */
  size: PropTypes.number,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    avatar: PropTypes.string,
    placeholder: PropTypes.string,
  }),
}

Avatar.defaultProps = {
  icons: {},
  photo: '',
  size: 26,
  theme: {},
}

export default consumeTheme(Avatar)
