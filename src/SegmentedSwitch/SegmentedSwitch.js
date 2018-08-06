import React from 'react'
import {
  arrayOf,
  bool,
  func,
  node,
  shape,
  string,
} from 'prop-types'
import classnames from 'classnames'
import shortid from 'shortid'

class SegmentedSwitch extends React.PureComponent {
  constructor (props) {
    super(props)
    this.instanceId = `segmented-switch-${shortid.generate()}`
    this.renderOption = this.renderOption.bind(this)
  }

  renderOption (option, index) {
    const {
      disabled,
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
          disabled={disabled}
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
      disabled,
      options,
      theme,
    } = this.props

    const containerClass = classnames(theme.segmentedSwitch, {
      [theme.disabled]: disabled,
    })

    return (
      <div className={containerClass}>
        {options.map(this.renderOption)}
      </div>
    )
  }
}

SegmentedSwitch.propTypes = {
  /**
   * Disables/enables the component's functions.
   */
  disabled: bool,
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
  disabled: false,
  theme: {},
}

export default SegmentedSwitch
