import React from 'react'
import { shallow } from 'enzyme'

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
