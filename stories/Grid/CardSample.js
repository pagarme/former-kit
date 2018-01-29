import React from 'react'

import {
  Card,
  CardGraphic,
} from '../../src/Card'

import style from './CardSample.style.css'


const CardSample = ({ size, color, children }) => (
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
  size: 0,
  color: '#ffffff',
  children: null,
}

export default CardSample
