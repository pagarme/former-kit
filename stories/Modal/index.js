import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'

import IconAddPhoto from 'emblematic-icons/svg/Camera32.svg'
import IconClose from 'emblematic-icons/svg/ClearClose32.svg'
import Section from '../Section'

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
      isOpen: true,
    }

    this.handleToggleModal = this.handleToggleModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  handleToggleModal () {
    this.setState({ isOpen: !this.state.isOpen })
  }

  handleCloseModal () {
    this.setState({ isOpen: false })
  }

  render () {
    return (
      <div>
        {/* call to action to open the modal */}
        <Button
          fill="flat"
          relevance="low"
          onClick={this.handleToggleModal}
          icon={<IconAddPhoto width={16} height={16} />}
        >
          Add Photo
        </Button>

        {/* modal content definition */}
        <Modal
          label="Create a Transaction"
          isOpen={this.state.isOpen}
          onRequestClose={this.handleToggleModal}
        >
          <ModalTitle
            closeIcon={<IconClose width={16} height={16} />}
            icon={<IconAddPhoto width={16} height={16} />}
            onClose={this.handleCloseModal}
            title="Add Photo"
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

storiesOf('Modal', module)
  .add('Default', () => (
    <Section>
      <ModalWithState />
    </Section>
  ))
