import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UICard')

const Card = ({
  className,
  children,
  theme,
}) => {
  const cardClasses = classNames(
    theme.card,
    className
  )
  return (
    <div className={cardClasses}>
      {children}
    </div>
  )
}

Card.propTypes = {
  theme: PropTypes.shape({
    base: PropTypes.string,
    card: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

Card.defaultProps = {
  theme: {},
  className: null,
}

export default consumeTheme(Card)
