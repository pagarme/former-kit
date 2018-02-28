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
      name,
      values,
      error,
      success,
      options,
      className,
      columns,
      theme,
    } = this.props

    const secondaryTextClass = classnames(
      theme.secondaryText,
      {
        [theme.error]: error,
        [theme.success]: success,
      }
    )

    const rootClassName = classnames(
      theme.checkboxGroup,
      className
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
        {(success || error) &&
          <p className={secondaryTextClass}>
            {success || error}
          </p>
        }
        <div>
          {checkboxes}
        </div>
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
    secondaryText: PropTypes.string,
    error: PropTypes.string,
    success: PropTypes.string,
  }),
  /**
   * List of objects which will be the base for the checkbox components.
   */
  options: PropTypes.arrayOf(PropTypes.shape({
    /**
     * Option value, which will be returned in the selected items list if
     * the related checkbox is checked.
     */
    value: PropTypes.string,
    /**
     * Option label shown next to the checkbox.
     */
    label: PropTypes.string,
  })).isRequired,
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
   * List of checked options.
   */
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * Allows or not the interaction with the checkboxes.
   */
  disabled: PropTypes.bool,
  /**
   * Error message which sets the error classes to the component.
   */
  error: PropTypes.string,
  /**
   * Success message which sets the success classes to the component.
   */
  success: PropTypes.string,
  /**
   * Custom CSS classes which can be added to the checkbox group.
   */
  className: PropTypes.string,
  /**
   * The number of columns in which the list will be divided.
   * The groups disposition is in columns.
   */
  columns: PropTypes.number,
}

CheckboxGroup.defaultProps = {
  theme: {},
  disabled: false,
  error: '',
  success: '',
  className: null,
  columns: 1,
}

export default consumeTheme(CheckboxGroup)
