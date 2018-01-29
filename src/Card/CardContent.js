import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UICard')

const CardContent = ({
  className,
  children,
  theme,
}) => {
  const cardContentClass = classNames(
    theme.content,
    className
  )
  return (
    <div className={cardContentClass}>
      {children}
    </div>
  )
}

CardContent.propTypes = {
  theme: PropTypes.shape({
    base: PropTypes.string,
    content: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

CardContent.defaultProps = {
  theme: {},
  className: null,
}

export default consumeTheme(CardContent)
