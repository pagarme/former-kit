import React, { Component } from 'react'
import PropType from 'prop-types'
import {
  evolve,
  has,
  map,
  merge,
  pipe,
  uncurryN,
  when,
} from 'ramda'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UIDateSelector')

const addPropIfHasDate = prop => when(
  has('date'),
  merge(prop)
)

const addProp = uncurryN(2, property => map(
  pipe(
    addPropIfHasDate(property),
    evolve({
      list: map(addPropIfHasDate(property)),
    })
  )
))

class Aside extends Component {
  renderRadio ({ date, key, label }) {
    const {
      name,
      selectedPreset,
    } = this.props

    const id = `${name}${key}`
    const asideKey = `${key}${label}`

    return (
      <li key={asideKey}>
        <input
          type="radio"
          name={name}
          id={id}
          checked={selectedPreset && selectedPreset === key}
          onChange={() => this.props.onChange(date(), key)}
        />
        <label htmlFor={id}>
          {label}
        </label>
      </li>
    )
  }

  renderPresets (namedPresets) {
    return namedPresets.map(({
      date,
      label,
      key,
      list,
    }) => {
      if (list) {
        return (
          <ol key={key}>
            <h2>{label}</h2>
            {this.renderPresets(list)}
          </ol>
        )
      }

      return this.renderRadio({ date, key, label })
    })
  }

  render () {
    const {
      name,
      presets,
      theme,
    } = this.props

    return (
      <div className={theme.aside}>
        {this.renderPresets(addProp({ name }, presets))}
      </div>
    )
  }
}

Aside.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
   */
  theme: PropType.shape({
    actions: PropType.string,
    container: PropType.string,
    selectedDays: PropType.string,
    sidebar: PropType.string,
    stage: PropType.string,
  }),
  /**
   * The name to be used on every rendered radio.
   */
  name: PropType.string.isRequired,
  /**
   * First radio id to be selected.
   */
  selectedPreset: PropType.string,
  /**
   * Triggers when another preset is selected.
   */
  onChange: PropType.func.isRequired,
  /**
   * Preset list to be rendered.
   */
  presets: PropType.arrayOf(
    PropType.shape({
      /**
       * Preset label to be presented with the radio.
       */
      label: PropType.string.isRequired,
      /**
       * Preset identifier, must be unique.
       */
      key: PropType.string.isRequired,
      /**
       * Preset date to return. Must be a function that return one
       * of the following values:
       * - zero for current day
       * - negative number for days ago
       * - positive number for days after
       * - null for any day
       */
      date: PropType.func,
      /**
       * Preset can be a list of dates, this prop must be used on this case.
       */
      list: PropType.arrayOf(
        PropType.shape({
          /**
           * Preset label to be presented with the radio.
           */
          label: PropType.string.isRequired,
          /**
           * Preset identifier, must be unique.
           */
          key: PropType.string.isRequired,
          /**
           * Preset date to return.
           */
          date: PropType.func,
        })
      ),
    })
  ).isRequired,
}

Aside.defaultProps = {
  selectedPreset: null,
  theme: {},
}

export default consumeTheme(Aside)
