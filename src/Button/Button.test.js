import React from 'react'
import { shallow } from 'enzyme'

import Button from './index'

describe('Button', () => {
  const onClick = jest.fn()

  const component = shallow(
    <Button onClick={onClick}>
      Test
    </Button>
  )

  it('should be clicked', () => {
    component.simulate('click')
    expect(onClick).toHaveBeenCalled()
  })
})
