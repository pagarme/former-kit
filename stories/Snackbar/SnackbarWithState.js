import React, { Component } from 'react'
import Proptypes from 'prop-types'
import IconClose from 'emblematic-icons/svg/ClearClose32.svg'

import Snackbar from '../../src/Snackbar'
import Timer from './Timer'

import Button from '../../src/Button'
import style from './style.css'

class SnackbarWithState extends Component {
  constructor () {
    super()

    this.state = {
      visible: false,
    }
    this.handleOpenSnackbar = this.handleOpenSnackbar.bind(this)
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this)
  }

  handleOpenSnackbar () {
    this.setState({ visible: true })
  }

  handleCloseSnackbar () {
    this.setState({ visible: false })
  }

  render () {
    const { dismissTimeOutExample } = this.props
    const { visible } = this.state
    return (
      <div>
        { visible && (
          <Snackbar
            icon={<IconClose height={12} width={12} />}
            dismissTimeout={dismissTimeOutExample ? 2500 : 0}
            onDismiss={this.handleCloseSnackbar}
            type="success"
          >
            <p>Settings saved successfully</p>
          </Snackbar>
        )}

        <p>This content will be hidden by the Snackbar Component</p>
        <div className={style.content}>
          <Button
            onClick={this.handleOpenSnackbar}
          >
            test snackbar
          </Button>
          {
            (visible && dismissTimeOutExample) && <Timer start={Date.now()} />
          }
        </div>
      </div>
    )
  }
}

SnackbarWithState.propTypes = {
  dismissTimeOutExample: Proptypes.bool,
}

SnackbarWithState.defaultProps = {
  dismissTimeOutExample: false,
}

export default SnackbarWithState
