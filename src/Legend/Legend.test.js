import React from 'react'
import { shallow } from 'enzyme'

import Legend from './index'

describe('Legend', () => {
  it('should mount basic component', () => {
    shallow(
      <Legend color="green-100">
        Pagas
      </Legend>
    )
  })

  it('should mount with manual abbreviations and outline', () => {
    shallow(
      <Legend
        color="green-100"
        acronym="PG"
        outline
      >
        Pagas
      </Legend>
    )
  })

  it('should not render label when using hideLabel', () => {
    const component = shallow(
      <Legend
        color="green-100"
        hideLabel
      >
        Pagas
      </Legend>
    )

    expect(component.find('span').length).toBe(0)
  })
})
