import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIAvatar')

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
  theme: PropTypes.shape({
    avatar: PropTypes.string,
    placeholder: PropTypes.string,
  }),
  size: PropTypes.number,
  photo: PropTypes.string,
  icons: PropTypes.shape({
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
