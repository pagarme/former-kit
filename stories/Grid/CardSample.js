import React from 'react'

import {
  Card,
  CardGraphic,
} from '../../src/Card'

import style from './CardSample.style.css'

const CardSample = ({ children, color, size }) => (
  <Card>
    <CardGraphic>
      <div
        className={style.cardSample}
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

CardSample.defaultProps = {
  children: null,
  color: '#ffffff',
  size: 0,
}

export default CardSample
