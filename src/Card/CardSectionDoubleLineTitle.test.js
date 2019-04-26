import React from 'react'
import { shallow } from 'enzyme'
import {
  CardSection,
  CardSectionDoubleLineTitle,
} from './index'

describe.only('CardSectionDoubleLineTitle', () => {
  it('should mount with simple title', () => {
    shallow(
      <CardSection>
        <CardSectionDoubleLineTitle title="Hi" />
        <p>Hello</p>
      </CardSection>
    )
  })

  it('should mount with clickable title', () => {
    const onClick = jest.fn()

    shallow(
      <CardSection>
        <CardSectionDoubleLineTitle
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
      <CardSection>
        <CardSectionDoubleLineTitle
          title="Hi"
          collapsed={false}
          onClick={onClick}
        />
        <p>Hello</p>
      </CardSection>
    )

    component.dive().find(CardSectionDoubleLineTitle).simulate('click')
    component.dive().find(CardSectionDoubleLineTitle).simulate('click')
    component.dive().find(CardSectionDoubleLineTitle).simulate('click')

    expect(onClick).toHaveBeenCalledTimes(3)
  })

  it('should not render title as an anchor when not collapsible', () => {
    const component = shallow(
      <CardSection>
        <CardSectionDoubleLineTitle title="Hi" />
        <p>Hello</p>
      </CardSection>
    )

    expect(component.contains('a')).toBeFalsy()
  })
})

