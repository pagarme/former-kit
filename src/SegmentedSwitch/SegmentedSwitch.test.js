import React from 'react'
import { shallow } from 'enzyme'

import ContextSwitch from './index'

describe('ContextSwitch', () => {
  it('should mount with correct selected option', () => {
    const component = shallow(
      <ContextSwitch
        name="live-test"
        onChange={() => undefined}
        options={[
          {
            title: 'Test',
            value: 'test',
          },
          {
            title: 'Live',
            value: 'live',
          },
        ]}
        value="live"
      />
    ).dive()

    const first = component.find('label').at(0).childAt(1)
    const second = component.find('label').at(1).childAt(1)

    expect(first.text()).toEqual('Test')
    expect(second.text()).toEqual('Live')
  })

  it('should trigger onChange when option changes', () => {
    const onChange = jest.fn()

    const component = shallow(
      <ContextSwitch
        name="live-test"
        onChange={onChange}
        options={[
          {
            title: 'Test',
            value: 'test',
          },
          {
            title: 'Live',
            value: 'live',
          },
        ]}
        value="live"
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
        name="live-test-yo"
        onChange={onChange}
        options={[
          {
            title: 'Yo',
            value: 'yo',
          },
          {
            title: 'Test',
            value: 'test',
          },
          {
            title: 'Live',
            value: 'live',
          },
        ]}
        value="test"
      />
    ).dive()

    component.find('input')
      .first()
      .simulate('change')

    expect(onChange).toHaveBeenCalledWith('yo', 0)
  })
})
