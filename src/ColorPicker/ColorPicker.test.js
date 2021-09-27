import React from 'react'
import { shallow } from 'enzyme'

import ColorPicker from '.'

describe('ColorPicker', () => {
  const onChange = jest.fn()
  const color = '#ff1'

  it('should mount component', () => {
    shallow(
      <ColorPicker
        onChange={onChange}
        color={color}
      />
    )
  })

  it('should valid initial value in color', () => {
    const component = shallow(
      <ColorPicker
        onChange={onChange}
        color={color}
      />
    )
    const input = component
      .dive()
      .find('input')

    expect(input.exists()).toBe(true)
    expect(input.props().value).toBe(color)
    expect(onChange).not.toHaveBeenCalled()
  })

  it('should trigger onChange input', () => {
    const component = shallow(
      <ColorPicker
        onChange={onChange}
        color={color}
      />
    )

    const input = component
      .dive()
      .find('input')
    expect(input.props().value).toBe(color)

    component
      .dive()
      .find('input')
      .simulate('change', {
        target: { value: 'red' },
      })

    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenLastCalledWith('red')
  })

  it('should trigger onCancel', () => {
    const onCancel = jest.fn()
    const component = shallow(
      <ColorPicker
        onChange={onChange}
        color={color}
        onCancel={onCancel}
      />
    )

    component
      .dive()
      .find('button')
      .simulate('click')

    expect(onCancel).toHaveBeenCalled()
  })
})

