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
      afterOpen: theme.modalAfterOpen,
      base: theme.modal,
      beforeClose: theme.modalBeforeClose,
    }}
    closeTimeoutMS={200}
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    overlayClassName={{
      afterOpen: theme.overlayAfterOpen,
      base: theme.overlay,
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
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    frame: PropTypes.string,
    modal: PropTypes.string,
    modalAfterOpen: PropTypes.string,
    modalBeforeClose: PropTypes.string,
    overlay: PropTypes.string,
    overlayAfterOpen: PropTypes.string,
    overlayBeforeClose: PropTypes.string,
  }),
}

Modal.defaultProps = {
  onRequestClose: null,
  theme: {
    frame: '',
    modal: '',
    modalAfterOpen: '',
    modalBeforeClose: '',
    overlay: '',
    overlayAfterOpen: '',
    overlayBeforeClose: '',
  },
}

export default consumeTheme(Modal)
