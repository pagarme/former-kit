import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import shortid from 'shortid'

import {
  propEq,
  pipe,
  find,
  prop,
  defaultTo,
} from 'ramda'

class Dropdown extends React.Component {
  constructor (props) {
    super(props)

    this.instanceId = `${props.name}-${shortid.generate()}`
    this.handleChange = this.handleChange.bind(this)
    this.selectedName = this.selectedName.bind(this)
  }

  handleChange (event) {
    const { disabled, onChange } = this.props

    if (!disabled) {
      onChange(event.target.value)
    }
  }

  selectedName () {
    const {
      options,
      value,
    } = this.props

    const selected = pipe(
      find(propEq('value', value)),
      defaultTo({}),
      prop('name'),
      defaultTo(this.props.placeholder || 'Selecione')
    )

    return selected(options)
  }

  renderOptions () {
    const {
      theme,
      options,
      value,
    } = this.props

    return options.map(({ value: optValue, name }) => {
      const optionClasses = classNames(
        theme.option,
        {
          [theme.active]: value === optValue,
        }
      )

      return (
        <option
          key={optValue}
          className={optionClasses}
          value={optValue}
        >
          {name}
        </option>
      )
    })
  }

  render () {
    const {
      disabled,
      error,
      icon,
      label,
      placeholder,
      success,
      theme,
    } = this.props

    const rootClasses = classNames(
      theme.dropdown,
      {
        [theme.disabled]: disabled,
        [theme.error]: error,
        [theme.success]: success,
      }
    )

    const hasSecondaryText = theme.secondaryText && (success || error)
    const hasLabel = theme.label && label

    return (
      <div className={rootClasses}>
        {hasLabel &&
          <label
            htmlFor={this.instanceId}
            className={theme.label}
          >
            {label}
          </label>
        }

        <select
          id={this.instanceId}
          className={theme.select}
          onChange={this.handleChange}
          disabled={disabled}
          defaultValue="placeholder"
        >
          <option
            disabled
            hidden
            value="placeholder"
            className={classNames(theme.option, theme.placeholder)}
          >
            {placeholder}
          </option>
          {this.renderOptions()}
        </select>

        <span className={theme.arrow}>
          {icon}
        </span>

        {hasSecondaryText &&
          <p className={theme.secondaryText}>
            {success || error}
          </p>
        }
      </div>
    )
  }
}

Dropdown.propTypes = {
  theme: PropTypes.shape({
    arrow: PropTypes.string,
    disabled: PropTypes.string,
    dropdown: PropTypes.string,
    error: PropTypes.string,
    select: PropTypes.string,
    placeholder: PropTypes.string,
    secondaryText: PropTypes.string,
    success: PropTypes.string,
  }),
  disabled: PropTypes.bool,
  error: PropTypes.string,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  success: PropTypes.string,
  value: PropTypes.string,
}

Dropdown.defaultProps = {
  theme: {},
  value: '',
  disabled: false,
  placeholder: '',
  error: '',
  success: '',
  label: '',
}

export default Dropdown
