import React from 'react'
import { shallow } from 'enzyme'
import {
  CardSection,
  CardSectionTitle,
} from './index'

describe('CardSection', () => {
  it('should mount with simple title', () => {
    shallow(
      <CardSection>
        <CardSectionTitle title="Hi" />
        <p>Hello</p>
      </CardSection>
    )
  })

  it('should mount with clickable title', () => {
    const onClick = jest.fn()

    shallow(
      <CardSection >
        <CardSectionTitle
          title="Hi"
          collapsed={false}
          onClick={onClick}
        />
        <p>Hello</p>
      </CardSection>
    )
  })

  it('should call onClick when clicking title', () => {
    const onClick = jest.fn()

    const component = shallow(
      <CardSection >
        <CardSectionTitle
          title="Hi"
          collapsed={false}
          onClick={onClick}
        />
        <p>Hello</p>
      </CardSection>
    )

    component.dive().find(CardSectionTitle).simulate('click')
    component.dive().find(CardSectionTitle).simulate('click')
    component.dive().find(CardSectionTitle).simulate('click')

    expect(onClick).toHaveBeenCalledTimes(3)
  })

  it('should not render title as an anchor when not collapsible', () => {
    const component = shallow(
      <CardSection>
        <CardSectionTitle title="Hi" />
        <p>Hello</p>
      </CardSection>
    )

    expect(component.contains('a')).toBeFalsy()
  })
})
