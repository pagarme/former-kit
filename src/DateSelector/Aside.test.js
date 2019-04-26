import React from 'react'
import { mount } from 'enzyme'

import Aside from './Aside'

const presets = [
  {
    date: () => null,
    key: 'single',
    label: 'single',
    mode: 'single',
  },
  {
    date: () => null,
    key: 'period',
    label: 'period',
    mode: 'period',
  },
  {
    key: 'last',
    label: 'last',
    list: [
      {
        date: () => -7,
        key: 'last-7',
        label: 'last 7',
        mode: 'period',
      },
    ],
    mode: 'period',
  },
]

describe('Aside', () => {
  it('should mount component', () => {
    mount(
      <Aside
        name="aside"
        onChange={() => null}
        presets={presets}
      />
    )
  })

  it('should render with selected preset', () => {
    const component = mount(
      <Aside
        name="aside"
        onChange={() => null}
        presets={presets}
        selectedPreset="last-7"
      />
    )

    expect(component.find('input[checked=true]#asidelast-7')).toHaveLength(1)
  })

  it('should call onChange when changing selected preset', () => {
    const onChange = jest.fn()

    const component = mount(
      <Aside
        name="aside"
        onChange={onChange}
        presets={presets}
      />
    )

    const periodRadio = component.find('input[type="radio"]#asideperiod')
    periodRadio.simulate('change')

    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
