import React from 'react'
import { mount } from 'enzyme'

import { TabBar, TabItem } from './index'

describe('TabBar', () => {
  const content1 = <div>Content 1</div>
  const content2 = <div>Content 2</div>

  const onClick = jest.fn()
  const component = mount(
    <TabBar>
      <TabItem onClick={onClick}>{content1}</TabItem>
      <TabItem>{content2}</TabItem>
    </TabBar>
  )

  it('should have 2 elements', () => {
    expect(component.find(TabItem)).toHaveLength(2)
  })

  it('should change content', () => {
    component
      .find(TabItem)
      .first()
      .find('input')
      .simulate('change')
    expect(onClick).toHaveBeenCalled()
    expect(component.contains(content1)).toBeTruthy()
    expect(component.contains(content2)).toBeFalsy()
  })
})
