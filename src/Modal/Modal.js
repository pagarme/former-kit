import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ReactModal from 'react-modal'
import ThemeConsumer from '../ThemeConsumer'

const getRootNode = (node) => {
  if (node) {
    if (!node.getRootNode) {
      return document.body
    }
    const rootNode = node.getRootNode()

    return rootNode.body || rootNode.firstElementChild
  }

  return null
}

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
  size,
  theme,
  verticalAlign,
}) => {
  const modalClasses = classNames(
    theme.modal,
    theme[size],
    theme[verticalAlign]
  )

  const [rootNode, setRootNode] = useState(null)

  const wrapperRef = useCallback(node => setRootNode(getRootNode(node)), [])

  return (
    <div ref={wrapperRef}>
      {rootNode && (
        <ReactModal
          appElement={rootNode}
          className={{
            afterOpen: theme.modalAfterOpen,
            base: modalClasses,
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
          parentSelector={() => rootNode}
          role="dialog"
        >
          {children}
        </ReactModal>
      )}
    </div>
  )
}

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
   * Component's size.
   */
  size: PropTypes.oneOf([
    'mobile', 'default', 'huge', 'small',
  ]),
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
    size: PropTypes.string,
  }),
  /**
   * Component's vertical align
   */
  verticalAlign: PropTypes.oneOf([
    'top', 'center', 'bottom',
  ]),
}

Modal.defaultProps = {
  onRequestClose: null,
  size: 'default',
  theme: {
    frame: '',
    modal: '',
    modalAfterOpen: '',
    modalBeforeClose: '',
    overlay: '',
    overlayAfterOpen: '',
    overlayBeforeClose: '',
  },
  verticalAlign: 'center',
}

export default consumeTheme(Modal)
