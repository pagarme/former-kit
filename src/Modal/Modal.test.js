import React from 'react'

import { mount } from 'enzyme'

import {
  Modal,
  ModalTitle,
  ModalContent,
  ModalActions,
} from './index'


describe('Modal', () => {
  it('should mount with isOpen=true', () => {
    mount(
      <Modal
        isOpen
      >
        <ModalTitle icon={<svg />} title="Awesome Content" />
        <ModalContent>Modal Content</ModalContent>
        <ModalActions>
          <button>I dont Work</button>
          <button>I Work</button>
        </ModalActions>
      </Modal>
    )
  })

  it('should mount with isOpen=false', () => {
    mount(
      <Modal
        isOpen={false}
      >
        <ModalTitle icon={<svg />} title="Awesome Content" />
        <ModalContent>Modal Content</ModalContent>
        <ModalActions>
          <button>I dont Work</button>
          <button>I Work</button>
        </ModalActions>
      </Modal>
    )
  })
})
