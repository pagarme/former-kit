import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconAddPhoto from 'emblematic-icons/svg/Camera32.svg'
import IconClose from 'emblematic-icons/svg/ClearClose32.svg'
import Button from '../../Button'
import {
  Modal,
  ModalActions,
  ModalContent,
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
    this.setState({ isOpen: !this.state.isOpen })
  }

  handleCloseModal () {
    this.setState({ isOpen: false })
  }

  render () {
    const {
      completeTitle,
      message,
      title,
      withActions,
    } = this.props
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
          isOpen={this.state.isOpen}
          label="Create a Transaction"
          onRequestClose={this.handleToggleModal}
        >
          {completeTitle
            ?
              <ModalTitle
                closeIcon={<IconClose width={16} height={16} />}
                icon={<IconAddPhoto width={16} height={16} />}
                onClose={this.handleCloseModal}
                title={title}
              />
            :
              <ModalTitle title={title} />
          }

          <ModalContent>
            <p>{message}</p>
          </ModalContent>
          {withActions &&
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
          }
        </Modal>
      </div>
    )
  }
}

ModalWithState.propTypes = {
  completeTitle: PropTypes.bool,
  message: PropTypes.string,
  title: PropTypes.string,
  withActions: PropTypes.bool,
}

ModalWithState.defaultProps = {
  completeTitle: false,
  message: 'This is the modal Content with React Modal module',
  title: 'Add photo',
  withActions: false,
}

export default ModalWithState
