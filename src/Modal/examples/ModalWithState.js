import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconAddPhoto from 'emblematic-icons/svg/Camera32.svg'
import IconClose from 'emblematic-icons/svg/ClearClose32.svg'
import Button from '../../Button'
import {
  Modal,
  ModalActions,
  ModalContent,
  ModalSection,
  ModalTitle,
} from '../index'

class ModalWithState extends Component {
  constructor () {
    super()

    this.state = {
      isOpen: false,
    }

    this.handleToggleModal = this.handleToggleModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  handleToggleModal () {
    const { isOpen } = this.state
    this.setState({ isOpen: !isOpen })
  }

  handleCloseModal () {
    this.setState({ isOpen: false })
  }

  render () {
    const {
      completeTitle,
      message,
      size,
      title,
      withActions,
      withSection,
    } = this.props
    const { isOpen } = this.state
    return (
      <div>
        {/* call to action to open the modal */}
        <Button
          fill="flat"
          onClick={this.handleToggleModal}
          relevance="low"
        >
          Open Modal
        </Button>

        {/* modal content definition */}
        <Modal
          isOpen={isOpen}
          label="Create a Transaction"
          onRequestClose={this.handleToggleModal}
          size={size}
        >
          {completeTitle
            ? (
              <ModalTitle
                closeIcon={<IconClose width={16} height={16} />}
                icon={<IconAddPhoto width={16} height={16} />}
                onClose={this.handleCloseModal}
                title={title}
              />
            )
            : <ModalTitle title={title} />
          }

          <hr />

          <ModalContent>
            {message}
          </ModalContent>

          {withSection && (
            <ModalContent>
              <ModalSection>
                <ModalContent>
                  This is the modal Section
                </ModalContent>
              </ModalSection>
            </ModalContent>
          )}

          {withActions && (
            <ModalActions>
              <Button
                fill="outline"
                onClick={this.handleToggleModal}
                size="default"
              >
                Cancel
              </Button>

              <Button
                onClick={this.handleToggleModal}
                size="default"
              >
                Confirm
              </Button>
            </ModalActions>
          )}
        </Modal>
      </div>
    )
  }
}

ModalWithState.propTypes = {
  completeTitle: PropTypes.bool,
  message: PropTypes.string,
  size: PropTypes.string,
  title: PropTypes.string,
  withActions: PropTypes.bool,
  withSection: PropTypes.bool,
}

ModalWithState.defaultProps = {
  completeTitle: false,
  message: 'This is the modal Content with React Modal module',
  size: 'default',
  title: 'Add photo',
  withActions: false,
  withSection: false,
}

export default ModalWithState
