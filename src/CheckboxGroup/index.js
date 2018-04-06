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

  handleChange (value) {
    const { disabled, values, onChange } = this.props

    if (disabled) return

    const valueIndex = values.indexOf(value)

    const nextValues = valueIndex >= 0
      ? filter(pipe(equals(value), not), values)
      : append(value, values)

    onChange(nextValues)
  }

  render () {
    const {
      disabled,
      columns,
      error,
      name,
      options,
      theme,
      values,
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

    const optionsSplitted =
      splitEvery(elementsByColumn, options)

    const hashList = list => list.map(({ value }) => `${value}`).join('')

    const checkboxes =
      optionsSplitted.map(list => (
        <div key={hashList(list)}>
          {
            list.map(({ value, label }) => (
              <Checkbox
                key={`${name}-${value}`}
                name={`${name}-${value}`}
                id={`${name}-${value}`}
                value={value}
                label={label}
                checked={contains(value, values)}
                onChange={partial(this.handleChange, [value])}
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
        {error &&
          <p className={secondaryTextClass}>
            {error}
          </p>
        }
      </div>
    )
  }
}

CheckboxGroup.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropTypes.shape({
    checkboxGroup: PropTypes.string,
    error: PropTypes.string,
    secondaryText: PropTypes.string,
  }),
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
   * @param {Array<string>} values
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
   * List of checked options.
   */
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
}

CheckboxGroup.defaultProps = {
  theme: {},
  columns: 1,
  disabled: false,
  error: '',
}

export default consumeTheme(CheckboxGroup)
