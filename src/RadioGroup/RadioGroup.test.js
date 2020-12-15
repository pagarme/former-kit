import React from 'react'
import { shallow } from 'enzyme'

import RadioGroup from './index'
import Radio from '../Radio'

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

    let component = shallow(
      <RadioGroup
        options={options}
        name="artefatos"
        onChange={onChange}
      />
    )

    const changeEvent = {
      target: {
        value,
      },
    }

    component = component
      .dive()
      .find(Radio)

    component
      .first()
      .dive()
      .simulate('change', changeEvent)

    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenLastCalledWith(changeEvent)

    const otherEvent = {
      target: {
        value: options[1],
      },
    }

    component
      .last()
      .dive()
      .simulate('change', otherEvent)

    expect(onChange).toHaveBeenLastCalledWith(otherEvent)
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
      .dive()
      .find(Radio)
      .first()
      .dive()
      .simulate('change', {
        target: { value },
      })

    expect(onChange).not.toHaveBeenCalled()
    expect(onChange).not.toHaveBeenLastCalledWith(value)
  })
})
