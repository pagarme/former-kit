import React from 'react'
import { shallow } from 'enzyme'

import ContextSwitch from './index'

describe('ContextSwitch', () => {
  it('should mount with two options', () => {
    const onChange = jest.fn()

    const component = shallow(
      <ContextSwitch
        items={['test', 'live']}
        onChange={onChange}
        name="live-test"
      />
    ).dive()

    component.find('input')
      .first()
      .simulate('change')

    expect(onChange).toHaveBeenCalledWith('test', 0)
  })

  it('should mount with more than two options basic', () => {
    const onChange = jest.fn()

    const component = shallow(
      <ContextSwitch
        items={['yo', 'test', 'live']}
        onChange={onChange}
        name="live-test"
      />
    ).dive()

    component.find('input')
      .first()
      .simulate('change')

    expect(onChange).toHaveBeenCalledWith('yo', 0)
  })
})
