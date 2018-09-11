import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../ThemeConsumer'

import Button from '../Button'
import Input from '../Input'


const ConsumeTheme = ThemeConsumer('UIUploadImage')

class UploadImage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      file: 'https://pagar.me/wp-content/uploads/2018/04/logo_pagarme.svg',
    }
    this.handleImageUpload = this.handleImageUpload.bind(this)
  }

  handleImageUpload (event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
    })
  }
  render () {
    const { theme } = this.props
    return (
      <div className={theme.uploadWrapper}>
        <img className={theme.imageUploaded} src={this.state.file} alt="upload" />
        <Button className={theme.uploadButton}>
          <Input
            className={theme.inputUpload}
            type="file"
            value=""
            onChange={this.handleImageUpload}
          />
          ESCOLHA O ARQUIVO
        </Button>
      </div>
    )
  }
}

UploadImage.propTypes = {

  theme: PropTypes.shape({
    uploadWrapper: PropTypes.string,
    imageUploaded: PropTypes.string,
    uploadButton: PropTypes.string,
    inputUpload: PropTypes.string,
  }),
}

UploadImage.defaultProps = {
  theme: {},
}

export default ConsumeTheme(UploadImage)
