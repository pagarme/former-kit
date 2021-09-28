import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import shortid from 'shortid'

class SegmentedSwitch extends PureComponent {
  constructor () {
    super()
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
        className={theme.item}
        htmlFor={id}
        key={id}
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
      className,
      disabled,
      options,
      relevance,
      spacing,
      theme,
    } = this.props

    const containerClass = classnames(
      className,
      theme.segmentedSwitch,
      theme[`spacing-${spacing}`],
      theme[`relevance-${relevance}`],
      {
        [theme.disabled]: disabled,
      }
    )

    return (
      <div className={containerClass}>
        {options.map(this.renderOption)}
      </div>
    )
  }
}

const numberOrString = PropTypes.oneOfType([
  PropTypes.string.isRequired,
  PropTypes.number.isRequired,
])

SegmentedSwitch.propTypes = {
  /**
   * Additional CSS classes which can be applied to the table component.
   */
  className: PropTypes.string,
  /**
   * It disables/enables the component's functions.
   */
  disabled: PropTypes.bool,
  /**
   * A name to identify the component in a form.
   */
  name: PropTypes.string.isRequired,
  /**
   * The callback called when an option receives a click.
   * @param {string} value - the value of the selected option
   * @param {number} index - the index of the selected option
   */
  onChange: PropTypes.func.isRequired,
  /**
   * The list of options that will be rendered.
   */
  options: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.node,
    value: numberOrString,
  })).isRequired,
  /**
   * The relevance to be used on the buttons
   */
  relevance: PropTypes.oneOf([
    'normal', 'low',
  ]),
  /**
   * The spacing to be used between the buttons
   */
  spacing: PropTypes.oneOf([
    'tiny', 'small', 'medium', 'large',
  ]),
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    /**
     * The class used when the item is disabled.
     */
    disabled: PropTypes.string,
    /**
     * The class used to stylize an option.
     */
    item: PropTypes.string,
    /**
     * The class used to stylize an option's label.
     */
    label: PropTypes.string,
    /**
     * The main class used to stylize the element.
     */
    segmentedSwitch: PropTypes.string,
  }),
  /**
   * The prop responsible for identifying the selected option value.
   */
  value: numberOrString.isRequired,
}

SegmentedSwitch.defaultProps = {
  className: '',
  disabled: false,
  relevance: 'normal',
  spacing: 'medium',
  theme: {},
}

export default SegmentedSwitch
