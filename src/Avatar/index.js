import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'
import classnames from 'classnames'

const applyThemr = themr('UIAvatar')

const Avatar = ({
  theme,
  photo,
  size,
  icon,
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
      {icon}
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
  icon: PropTypes.element,
}

Avatar.defaultProps = {
  theme: {},
  photo: null,
  size: 26,
  icon: null,
}

export default applyThemr(Avatar)
