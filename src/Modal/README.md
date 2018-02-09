Modal examples

``` jsx
class ModalWithState extends React.Component {
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
    return (
      <div>
        {/* call to action to open the modal */}
        <Button
          fill="flat"
          relevance="low"
          onClick={this.handleToggleModal}
        >
          Open Modal
        </Button>

        {/* modal content definition */}
        <Modal
          label="Create a Transaction"
          isOpen={this.state.isOpen}
          onRequestClose={this.handleToggleModal}
        >
          <ModalTitle title="Modal" />

          <ModalContent>
            <p>This is the modal Content with React Modal module</p>
          </ModalContent>

          <ModalActions>
            <Button
              fill="outline"
              size="small"
              onClick={this.handleToggleModal}
            >
              Cancel
            </Button>

            <Button
              size="small"
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

<ModalWithState />
```
