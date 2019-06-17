import React, { Component } from 'react'
import IconClose from 'emblematic-icons/svg/ClearClose32.svg'

import {
  Modal,
  ModalActions,
  ModalContent,
  ModalSection,
  ModalTitle,
} from '../../src/Modal'

import Button from '../../src/Button'

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
    const { isOpen } = this.state

    return (
      <div>
        {/* call to action to open the modal */}
        <Button
          fill="flat"
          relevance="low"
          onClick={this.handleToggleModal}
        >
          Modal with huge size
        </Button>

        {/* modal content definition */}
        <Modal
          label="Create a Transaction"
          isOpen={isOpen}
          onRequestClose={this.handleToggleModal}
          size="huge"
        >
          <ModalTitle
            closeIcon={<IconClose width={16} height={16} />}
            onClose={this.handleCloseModal}
            title="Modal With Huge Size"
          />
          <hr />
          <ModalContent>
            This is the modal Content with React Modal module
          </ModalContent>

          <ModalContent>
            <ModalSection>
              <ModalContent>
                This is the modal Section
              </ModalContent>
            </ModalSection>
          </ModalContent>
          <ModalActions>
            <Button
              fill="outline"
              size="default"
              onClick={this.handleToggleModal}
            >
              Cancel
            </Button>

            <Button
              size="default"
              onClick={this.handleToggleModal}
            >
              Confirm
            </Button>
          </ModalActions>
        </Modal>
      </div>
    )
  }
}

export default ModalWithState
