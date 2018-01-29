import React from 'react'
import {
  arrayOf,
  string,
  func,
  shape,
} from 'prop-types'
import shortid from 'shortid'
import { themr } from 'react-css-themr'

const applyThemr = themr('UISegmentedSwitch')

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
  theme: shape({
    segmentedSwitch: string,
    item: string,
    label: string,
  }),
  items: arrayOf(string).isRequired,
  selected: string.isRequired,
  onChange: func.isRequired,
  name: string.isRequired,
}

SegmentedSwitch.defaultProps = {
  theme: {},
  selected: '',
}

export default applyThemr(SegmentedSwitch)
