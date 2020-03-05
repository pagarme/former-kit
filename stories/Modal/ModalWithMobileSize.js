import React, { useState } from 'react'
import IconClose from 'emblematic-icons/svg/ClearClose32.svg'

import {
  Modal,
  ModalActions,
  ModalContent,
  ModalSection,
  ModalTitle,
} from '../../src/Modal'

import Button from '../../src/Button'

const CallToAction = ({ onClick }) => (
  <Button fill="flat" relevance="low" onClick={onClick}>
    Modal with mobile size
  </Button>
)

const ModalWithMobileSize = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleModal = () => {
    setIsOpen(!isOpen)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  return (
    <div>
      <CallToAction onClick={handleToggleModal} />
      <Modal
        label="Create a Transaction"
        isOpen={isOpen}
        onRequestClose={handleToggleModal}
        size="mobile"
      >
        <ModalTitle
          closeIcon={<IconClose width={16} height={16} />}
          onClose={handleCloseModal}
          title="Modal With Mobile Size"
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
            onClick={handleToggleModal}
          >
            Cancel
          </Button>

          <Button
            size="default"
            onClick={handleToggleModal}
          >
            Confirm
          </Button>
        </ModalActions>
      </Modal>
    </div>
  )
}

export default ModalWithMobileSize
