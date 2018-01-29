import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIModal')

const Modal = ({
  theme,
  children,
  isOpen,
  onRequestClose,
}) => (
  <ReactModal
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
  theme: PropTypes.shape({
    overlay: PropTypes.string,
    modal: PropTypes.string,
    frame: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func,
}

Modal.defaultProps = {
  theme: {},
  onRequestClose: null,
}

export default consumeTheme(Modal)
