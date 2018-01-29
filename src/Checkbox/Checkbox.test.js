import React from 'react'
import { shallow } from 'enzyme'

import Checkbox from './index'

describe('Checkbox', () => {
  it('should trigger onChange', () => {
    const onChange = jest.fn()
    const value = 'mock value'

    const component = shallow(
      <Checkbox
        name="pessoa"
        value={value}
        label="Leonardo"
        checked={false}
        onChange={onChange}
        error={'error'}
        success={'success'}
      />
    )

    component
      .dive()
      .find('input')
      .simulate('change', {
        target: { value },
      })

    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenLastCalledWith(value)
  })

  it('should not trigger onChange', () => {
    const onChange = jest.fn()
    const value = 'mock value'

    const component = shallow(
      <Checkbox
        name="pessoa"
        value={value}
        label="Leonardo"
        checked={false}
        disabled
        onChange={onChange}
        error={'error'}
        success={'success'}
      />
    )

    component
      .dive()
      .find('input')
      .simulate('change', {
        target: { value },
      })

    expect(onChange).not.toHaveBeenCalled()
    expect(onChange).not.toHaveBeenLastCalledWith(value)
  })
})
