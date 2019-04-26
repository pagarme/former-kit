import React from 'react'
import { mount } from 'enzyme'

import Steps from '.'

const Component = () => (
  <Steps
    status={[
      { id: 'current', status: 'current' },
    ]}
    steps={[
      { id: 'current', title: 'Current' },
      { id: 'pending', title: 'Pending' },
    ]}
  />
)

describe('Steps', () => {
  it('should render steps', () => {
    const component = mount(<Component />)

    expect(component).toHaveLength(1)
  })
})
