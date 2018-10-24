import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIModal')

/**
 * This component allows the user to create a content over
 * the page blocking all background content.
 * It's very useful when the user attention must stay in a specific
 * part of the content.
 */
const Modal = ({
  children,
  isOpen,
  onRequestClose,
  theme,
}) => (
  <ReactModal
    appElement={document.body}
    className={{
      base: theme.modal,
      afterOpen: theme.modalAfterOpen,
      beforeClose: theme.modalBeforeClose,
    }}
    closeTimeoutMS={200}
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    overlayClassName={{
      base: theme.overlay,
      afterOpen: theme.overlayAfterOpen,
      beforeClose: theme.overlayBeforeClose,
    }}
    parentSelector={() => document.body}
    role="dialog"
  >
    {children}
  </ReactModal>
)

Modal.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    frame: PropTypes.string,
    modal: PropTypes.string,
    overlay: PropTypes.string,
  }),
  /**
   * Set of React elements which will be rendered inside the modal.
   */
  children: PropTypes.node.isRequired,
  /**
   * Indicates if the modal is being shown.
   */
  isOpen: PropTypes.bool.isRequired,
  /**
   * Triggered when the modal is closed.
   * @param event
   */
  onRequestClose: PropTypes.func,
}

Modal.defaultProps = {
  onRequestClose: null,
  theme: {},
}

export default consumeTheme(Modal)
