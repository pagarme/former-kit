import React from 'react'
import PropTypes from 'prop-types'
import ToolTip from '../'
import Button from '../../Button'

const lorem = `
Lorem ipsum dolor sit amet consectetur adipisicing elit.
Deleniti officia ipsam consectetur laudantium eius asperiores ut
maiores corporis.
`

const Tooltip = ({ placement, text }) => (
  <ToolTip
    content={lorem}
    placement={placement}
  >
    <Button>{ text }</Button>
  </ToolTip>
)

Tooltip.propTypes = {
  placement: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default Tooltip
