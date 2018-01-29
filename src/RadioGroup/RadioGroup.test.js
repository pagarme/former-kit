import React from 'react'
import { shallow, mount } from 'enzyme'

import RadioGroup from './index'

describe('RadioGroup', () => {
  const options = [
    {
      name: 'Prédio',
      value: 'predio',
    },
    {
      name: 'Casa',
      value: 'casa',
    },
    {
      name: 'Sofá',
      value: 'sofa',
    },
  ]

  const { value } = options[0]

  it('should trigger onChange', () => {
    const onChange = jest.fn()

    const component = mount(
      <RadioGroup
        options={options}
        name="artefatos"
        onChange={onChange}
      />
    )

    component
      .find('input[type="radio"]')
      .first()
      .simulate('change', {
        target: { value },
      })

    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenLastCalledWith(value)

    component
      .find('input[type="radio"]')
      .last()
      .simulate('change', {
        target: { value: 'sofa' },
      })

    expect(onChange).toHaveBeenLastCalledWith('sofa')
  })

  it('should mount with all props', () => {
    const onChange = jest.fn()

    const component = shallow(
      <RadioGroup
        options={options}
        name="artefatos"
        onChange={onChange}
        value="something"
        disabled
        error="error mock txt"
      />
    )

    component
      .find('input[type="radio"]')
      .first()
      .simulate('change', {
        target: { value },
      })

    expect(onChange).not.toHaveBeenCalled()
    expect(onChange).not.toHaveBeenLastCalledWith(value)
  })
})
