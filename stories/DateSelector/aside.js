import React from 'react'
import { action } from '@storybook/addon-actions'

import Aside from '../../src/DateSelector/Aside'
import presets from './presets'

export default class AsideState extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedPreset: props.selectedPreset || '',
    }

    this.handlePresetChange = this.handlePresetChange.bind(this)
  }

  handlePresetChange (date, key) {
    this.setState({
      selectedPreset: key,
    })

    action('onChange')({ date, key })
  }

  render () {
    return (
      <Aside
        name="my-aside"
        selectedPreset={this.state.selectedPreset}
        onChange={this.handlePresetChange}
        presets={presets}
      />
    )
  }
}
