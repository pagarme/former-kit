import React from 'react'
import { mount } from 'enzyme'

import CheckboxGroup from './index'

describe('CheckboxGroup', () => {
  const options = [
    {
      label: 'Prédio',
      value: 'predio',
    },
    {
      label: 'Casa',
      value: 'casa',
    },
    {
      label: 'Sofá',
      value: 'sofa',
    },
  ]

  it('should call onChange with checked value', () => {
    const onChange = jest.fn()

    const values = ['sofa']
    const { value } = options[0]

    const component = mount(
      <CheckboxGroup
        options={options}
        name="pessoas"
        onChange={onChange}
        values={values}
        error="error"
        success="success"
      />
    )

    component
      .find('[name="pessoas-predio"]')
      .at(2)
      .simulate('change')

    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenLastCalledWith(['sofa', value])
  })

  it('should call onChange without unchecked value', () => {
    const onChange = jest.fn()

    const values = ['sofa', 'predio']

    const component = mount(
      <CheckboxGroup
        options={options}
        name="pessoas"
        onChange={onChange}
        values={values}
        error="error"
        success="success"
      />
    )

    component
      .find('[name="pessoas-predio"]')
      .at(2)
      .simulate('change')

    expect(onChange).toHaveBeenLastCalledWith(['sofa'])
  })

  it('should not call onChange when disabled', () => {
    const onChange = jest.fn()

    const values = ['sofa', 'predio']

    const component = mount(
      <CheckboxGroup
        options={options}
        name="pessoas"
        onChange={onChange}
        values={values}
        disabled
        error="error"
        success="success"
      />
    )

    component
      .find('input[type="checkbox"]')
      .first()
      .simulate('change')

    expect(onChange).not.toHaveBeenCalled()
  })
})

