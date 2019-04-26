import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import {
  append,
  contains,
  equals,
  filter,
  pipe,
  not,
  partial,
  splitEvery,
} from 'ramda'

import ThemeConsumer from '../ThemeConsumer'
import Checkbox from '../Checkbox/form'

const consumeTheme = ThemeConsumer('UICheckboxGroup')

/**
 * Group of checkbox components which can be used to
 * control multiple selectable items.
 * It needs a list of options with value and label, and allows
 * the selection of the components using the options.
 * When an option is checked/unchecked, it triggers a function which
 * returns all checked options.
 */
class CheckboxGroup extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  shouldComponentUpdate (nextProps) {
    return !equals(this.props, nextProps)
  }

  handleChange (toggled) {
    const { disabled, onChange, value } = this.props

    if (disabled) return

    const valueIndex = value.indexOf(toggled)

    const nextValues = valueIndex >= 0
      ? filter(pipe(equals(toggled), not), value)
      : append(toggled, value)

    onChange(nextValues)
  }

  render () {
    const {
      columns,
      disabled,
      error,
      name,
      options,
      theme,
      value,
    } = this.props

    const secondaryTextClass = classnames(
      theme.secondaryText,
      {
        [theme.error]: error,
      }
    )

    const rootClassName = classnames(
      theme.checkboxGroup
    )

    const elementsByColumn = Math.ceil(options.length / columns)

    const optionsSplitted = splitEvery(elementsByColumn, options)

    const hashList = list => list.map(({ value: val }) => `${val}`).join('')

    const checkboxes = optionsSplitted.map(list => (
      <div key={hashList(list)}>
        {
          list.map(({ label, value: checkboxValue }) => (
            <Checkbox
              key={`${name}-${checkboxValue}`}
              name={`${name}-${checkboxValue}`}
              id={`${name}-${checkboxValue}`}
              value={checkboxValue}
              label={label}
              checked={contains(checkboxValue, value)}
              onChange={partial(this.handleChange, [checkboxValue])}
              disabled={disabled}
            />
          ))
        }
      </div>
    ))

    return (
      <div className={rootClassName}>
        <div>
          {checkboxes}
        </div>
        {error && (
          <p className={secondaryTextClass}>{error}</p>
        )}
      </div>
    )
  }
}

CheckboxGroup.propTypes = {
  /**
   * The number of columns in which the list will be divided.
   * The groups disposition is in columns.
   */
  columns: PropTypes.number,
  /**
   * Allows or not the interaction with the checkboxes.
   */
  disabled: PropTypes.bool,
  /**
   * Error message which sets the error classes to the component.
   */
  error: PropTypes.string,
  /**
   * Group name, used in the checkboxes like the native HTML checkbox name.
   */
  name: PropTypes.string.isRequired,
  /**
   * Triggered when an option is checked or unchecked.
   * @param {Array<string>} value
   */
  onChange: PropTypes.func.isRequired,
  /**
   * List of objects which will be the base for the checkbox components.
   */
  options: PropTypes.arrayOf(PropTypes.shape({
    /**
     * Option label shown next to the checkbox.
     */
    label: PropTypes.string,
    /**
     * Option value, which will be returned in the selected items list if
     * the related checkbox is checked.
     */
    value: PropTypes.string,
  })).isRequired,
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    checkboxGroup: PropTypes.string,
    error: PropTypes.string,
    secondaryText: PropTypes.string,
  }),
  /**
   * List of checked options.
   */
  value: PropTypes.arrayOf(PropTypes.string),
}

CheckboxGroup.defaultProps = {
  columns: 1,
  disabled: false,
  error: '',
  theme: {},
  value: [],
}

export default consumeTheme(CheckboxGroup)
