import React from 'react'
import { shallow } from 'enzyme'
import ArrowIcon from 'react-icons/lib/fa/angle-down'
import Dropdown from './index'

describe('Dropdown', () => {
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

    const component = shallow(
      <Dropdown
        options={options}
        name="artefatos"
        label="Selecione um"
        onChange={onChange}
        icon={<ArrowIcon />}
      />
    ).dive()

    component
      .find('select')
      .first()
      .simulate('change', {
        target: { value },
      })

    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenLastCalledWith(value)
  })

  it('should mount with disabled', () => {
    const onChange = jest.fn()

    const component = shallow(
      <Dropdown
        options={options}
        name="artefatos"
        disabled
        label="Selecione um"
        onChange={onChange}
        icon={<ArrowIcon />}
      />
    )

    component
      .find('select')
      .first()
      .simulate('change', {
        target: { value },
      })

    expect(onChange).not.toHaveBeenCalled()
    expect(onChange).not.toHaveBeenLastCalledWith(value)
  })

  it('should mount with success', () => {
    const onChange = jest.fn()

    const component = shallow(
      <Dropdown
        options={options}
        name="artefatos"
        disabled
        success="mock text"
        label="Selecione um"
        onChange={onChange}
        icon={<ArrowIcon />}
      />
    )

    component
      .find('select')
      .first()
      .simulate('change', {
        target: { value },
      })

    expect(onChange).not.toHaveBeenCalled()
    expect(onChange).not.toHaveBeenLastCalledWith(value)
  })

  it('should mount with error', () => {
    const onChange = jest.fn()

    const component = shallow(
      <Dropdown
        options={options}
        name="artefatos"
        error="mock text"
        label="Selecione um"
        onChange={onChange}
        icon={<ArrowIcon />}
      />
    ).dive()

    component
      .find('select')
      .first()
      .simulate('change', {
        target: { value },
      })

    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenLastCalledWith(value)
  })

  it('should mount with all props', () => {
    const onChange = jest.fn()

    const component = shallow(
      <Dropdown
        options={options}
        name="artefatos"
        error="mock text"
        label="Selecione um"
        value="something"
        title="title here"
        onChange={onChange}
        icon={<ArrowIcon />}
      />
    ).dive()

    component
      .find('select')
      .first()
      .simulate('change', {
        target: { value },
      })

    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenLastCalledWith(value)
  })

  it('should mount with all props', () => {
    const onChange = jest.fn()

    const component = shallow(
      <Dropdown
        options={options}
        name="artefatos"
        error="mock text"
        label="Selecione um"
        value="something"
        disabled
        title="title here"
        onChange={onChange}
        icon={<ArrowIcon />}
      />
    )

    component
      .find('select')
      .first()
      .simulate('change', {
        target: { value },
      })

    expect(onChange).not.toHaveBeenCalled()
    expect(onChange).not.toHaveBeenLastCalledWith(value)
  })
})

