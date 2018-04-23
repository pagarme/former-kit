import React from 'react'
import { shallow, mount } from 'enzyme'

import Switch from './index'

describe('Switch', () => {
  it('should trigger onChange', () => {
    const onChange = jest.fn()

    const component = shallow(
      <Switch
        onChange={onChange}
      />
    ).dive()
    component.find('input').simulate('change')
    expect(onChange).toHaveBeenCalled()
  })

  it('Should render on default translation', () => {
    const onChange = jest.fn()

    const component = shallow(
      <Switch
        checked
        onChange={onChange}
      />
    ).dive()

    expect(component.find('span').text()).toBe('on')
  })

  it('Should have a name prop', () => {
    const onChange = jest.fn()

    const component = mount(
      <Switch
        checked
        name="awesome-name"
        onChange={onChange}
      />
    )

    expect(component.props().name).not.toBeUndefined()
    expect(component.props().name).toEqual('awesome-name')
  })

  it('Should render on label in portuguese', () => {
    const onChange = jest.fn()

    const component = shallow(
      <Switch
        checked
        onChange={onChange}
        strings={{
          on: 'ligado',
        }}
      />
    ).dive()

    expect(component.find('span').text()).toBe('ligado')
  })

  it('Should render off label in portuguese', () => {
    const onChange = jest.fn()

    const component = shallow(
      <Switch
        onChange={onChange}
        strings={{
          off: 'desligado',
        }}
      />
    ).dive()

    expect(component.find('span').text()).toBe('desligado')
  })
})
