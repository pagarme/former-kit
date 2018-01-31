import React from 'react'
import {
  arrayOf,
  string,
  func,
  shape,
} from 'prop-types'
import shortid from 'shortid'

import ThemeConsumer from '../ThemeConsumer'

const consumeTheme = ThemeConsumer('UISegmentedSwitch')

class SegmentedSwitch extends React.PureComponent {
  constructor (props) {
    super(props)
    this.instanceId = `segmented-switch-${shortid.generate()}`
    this.renderItem = this.renderItem.bind(this)
  }

  renderItem (item, index) {
    const {
      selected,
      onChange,
      name,
      theme,
    } = this.props

    const id = `${this.instanceId}-${name}-${item}`

    return (
      <label
        key={id}
        className={theme.item}
        htmlFor={id}
      >
        <input
          id={id}
          name={id}
          value={item}
          type="radio"
          checked={selected === item}
          onChange={() => onChange(item, index)}
        />

        <span className={theme.label}>{item}</span>
      </label>
    )
  }

  render () {
    const {
      theme,
      items,
    } = this.props

    return (
      <div className={theme.segmentedSwitch}>
        {items.map(this.renderItem)}
      </div>
    )
  }
}

SegmentedSwitch.propTypes = {
  /**
   * @see [ThemeProvider](#themeprovider) - Theme received from consumeTheme wrapper
   */
  theme: shape({
    /**
     * The main class used to stylize the element.
    */
    segmentedSwitch: string,
    /**
     * The class used to stylize an item.
     */
    item: string,
    /**
     * The class used to stylize an item's label.
    */
    label: string,
  }),
  /**
   * The list of items that will be rendered.
  */
  items: arrayOf(string).isRequired,
  /**
   * The prop responsible for identifying the selected item.
   * Its value is the value of one of the "items".
  */
  selected: string.isRequired,
  /**
   * The callback called when an item receives a click.
   * @param {string} item - the value of the item clicked
   * @param {number} index - the index of the item click
  */
  onChange: func.isRequired,
  /**
   * A name to identify the component and create unique ids for
   * the items.
  */
  name: string.isRequired,
}

SegmentedSwitch.defaultProps = {
  theme: {},
}

export default consumeTheme(SegmentedSwitch)
