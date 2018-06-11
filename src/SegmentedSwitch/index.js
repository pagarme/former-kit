import React from 'react'
import {
  arrayOf,
  func,
  node,
  shape,
  string,
} from 'prop-types'
import shortid from 'shortid'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UISegmentedSwitch')

class SegmentedSwitch extends React.PureComponent {
  constructor (props) {
    super(props)
    this.instanceId = `segmented-switch-${shortid.generate()}`
    this.renderOption = this.renderOption.bind(this)
  }

  renderOption (option, index) {
    const {
      name,
      onChange,
      theme,
      value,
    } = this.props

    const id = `${this.instanceId}-${name}-${option.value}`

    return (
      <label
        key={id}
        className={theme.item}
        htmlFor={id}
      >
        <input
          checked={value === option.value}
          id={id}
          name={this.instanceId}
          onChange={() => onChange(option.value, index)}
          type="radio"
          value={option.value}
        />

        <span className={theme.label}>{option.title}</span>
      </label>
    )
  }

  render () {
    const {
      options,
      theme,
    } = this.props

    return (
      <div className={theme.segmentedSwitch}>
        {options.map(this.renderOption)}
      </div>
    )
  }
}

SegmentedSwitch.propTypes = {
  /**
   * A name to identify the component in a form.
   */
  name: string.isRequired,
  /**
   * The callback called when an option receives a click.
   * @param {string} value - the value of the selected option
   * @param {number} index - the index of the selected option
   */
  onChange: func.isRequired,
  /**
   * The list of options that will be rendered.
   */
  options: arrayOf(shape({
    title: node,
    value: string,
  })).isRequired,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: shape({
    /**
     * The main class used to stylize the element.
    */
    segmentedSwitch: string,
    /**
     * The class used to stylize an option.
     */
    item: string,
    /**
     * The class used to stylize an option's label.
    */
    label: string,
  }),
  /**
   * The prop responsible for identifying the selected option value.
  */
  value: string.isRequired,
}

SegmentedSwitch.defaultProps = {
  theme: {},
}

export default consumeTheme(SegmentedSwitch)
