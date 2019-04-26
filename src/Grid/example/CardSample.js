import React from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  CardGraphic,
} from '../../Card'

const CardSample = ({ children, color, size }) => (
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
  children: PropTypes.node,
  color: PropTypes.string,
  size: PropTypes.number,
}

CardSample.defaultProps = {
  children: null,
  color: '#ffffff',
  size: 0,
}

export default CardSample
