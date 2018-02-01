import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIModal')

/**
 * This component allows the user to create a content over
 * the page blocking all background content.
 * It is very useful when the user attention must stay in a specific
 * part of the content.
 */
const Modal = ({
  theme,
  children,
  isOpen,
  onRequestClose,
}) => (
  <ReactModal
    appElement={document.body}
    isOpen={isOpen}
    role="dialog"
    parentSelector={() => document.body}
    overlayClassName={theme.overlay}
    className={theme.modal}
    onRequestClose={onRequestClose}
  >
    <div className={theme.frame}>
      {children}
    </div>
  </ReactModal>
)

Modal.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from consumeTheme wrapper.
   */
  theme: PropTypes.shape({
    overlay: PropTypes.string,
    modal: PropTypes.string,
    frame: PropTypes.string,
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
  theme: {},
  onRequestClose: null,
}

export default consumeTheme(Modal)
