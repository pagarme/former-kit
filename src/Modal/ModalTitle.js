import React from 'react'
import PropTypes from 'prop-types'
import { isNil } from 'ramda'
import Button from '../Button'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIModal')

const validateCloseProp = (closeIcon, onClose, propName) => {
  const isCloseProp = propName === 'onClose' || propName === 'closeIcon'
  if (isCloseProp
    && !isNil(closeIcon)
    && isNil(onClose)
  ) {
    throw new Error(
      `The prop onClose must be a function 
        when the closeIcon prop is received`
    )
  }
}

const validateOnCloseFunction = ({ closeIcon, onClose }, propName) =>
  validateCloseProp(closeIcon, onClose, propName)

const validateCloseIcon = ({ closeIcon, onClose }, propName) =>
  validateCloseProp(closeIcon, onClose, propName)

/**
 * Modal component title. It renders its children at the top of the Modal.
 */
const ModalTitle = ({
  theme,
  title,
  icon,
  closeIcon,
  onClose,
  titleAlign,
}) => (
  <div className={theme.title}>
    {icon && <div className={theme.icon}>{icon}</div>}
    <h2 className={theme[`${titleAlign}Align`]}>{title}</h2>
    {closeIcon &&
      <Button
        fill="clean"
        icon={closeIcon}
        onClick={onClose}
        relevance="low"
      />
    }
  </div>
)

ModalTitle.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    icon: PropTypes.string,
    title: PropTypes.string,
  }),
  /**
   * Close button icon.
   */
  closeIcon: validateCloseIcon,
  /**
   * The custom icon which stays at the left side of the title.
   */
  icon: PropTypes.element,
  /**
   * Close action callback.
   */
  onClose: validateOnCloseFunction,
  /**
   * Text which will be shown at the top of the Modal.
   */
  title: PropTypes.string.isRequired,
  /**
   * Text title alignment
   */
  titleAlign: PropTypes.oneOf(['center', 'end', 'start']),
}

ModalTitle.defaultProps = {
  closeIcon: null,
  icon: null,
  onClose: null,
  theme: {},
  titleAlign: 'center',
}

export default consumeTheme(ModalTitle)
