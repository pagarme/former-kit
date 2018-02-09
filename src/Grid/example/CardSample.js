import React from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  CardGraphic,
} from '../../Card'


const CardSample = ({ size, color, children }) => (
  <Card>
    <CardGraphic>
      <div
        style={{ backgroundColor: color }}
      >
        {size > 0
          ? `${size} column${size > 1 ? 's' : ''}`
          : null
        }
        {children}
      </div>
    </CardGraphic>
  </Card>
)

CardSample.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  children: PropTypes.node,
}

CardSample.defaultProps = {
  size: 0,
  color: '#ffffff',
  children: null,
}

export default CardSample
