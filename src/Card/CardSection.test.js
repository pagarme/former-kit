import React from 'react'
import { shallow } from 'enzyme'
import { CardSection } from './index'

describe('CardSection', () => {
  it('should mount with simple title', () => {
    shallow(
      <CardSection
        title="Hi"
      >
        <p>Hello</p>
      </CardSection>
    )
  })

  it('should mount with clickable title', () => {
    const onClick = jest.fn()

    shallow(
      <CardSection
        title="Hi"
        collapsedTitle="Bye"
        collapsed={false}
        onTitleClick={onClick}
      >
        <p>Hello</p>
      </CardSection>
    )
  })

  it('should call onClick when clicking title', () => {
    const onClick = jest.fn()

    const component = shallow(
      <CardSection
        title="Hi"
        collapsedTitle="Bye"
        collapsed={false}
        onTitleClick={onClick}
      >
        <p>Hello</p>
      </CardSection>
    )

    component.dive().find('[role="button"]').simulate('click')
    component.dive().find('[role="button"]').simulate('click')
    component.dive().find('[role="button"]').simulate('click')

    expect(onClick).toHaveBeenCalledTimes(3)
  })

  it('should not render title as an anchor when not collapsible', () => {
    const component = shallow(
      <CardSection
        title="Hi"
      >
        <p>Hello</p>
      </CardSection>
    )

    expect(component.contains('a')).toBeFalsy()
  })
})
