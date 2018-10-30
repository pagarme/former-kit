import React, { Fragment } from 'react'
import { mount } from 'enzyme'

import Popover from './Popover'
import PopoverMenu from './PopoverMenu'
import Button from '../Button'

const PopoverComponent = () => (
  <Popover
    content={
      <Fragment>
        <div>
          <strong>test@email.com</strong>
          <small>admin</small>
        </div>
        <PopoverMenu
          items={[
            {
              title: 'Account',
              action: () => undefined,
            },
            {
              title: 'Logout',
              action: () => undefined,
            },
          ]}
        />
      </Fragment>
    }
  >
    <Button>click me</Button>
  </Popover>
)

describe('Popover', () => {
  it('should render popover when button is clicked', () => {
    const component = mount(<PopoverComponent />)

    component.simulate('click')
    expect(component.find('div > div > div').first()).toHaveLength(1)
  })

  it('should remove popover when button is clicked', () => {
    const component = mount(<PopoverComponent />)

    component.simulate('click')
    component.simulate('click')

    expect(component.find('div > div > div').first()).toHaveLength(0)
  })

  it('should remove popover when an menu item is clicked', () => {
    const component = mount(<PopoverComponent />)
    component.simulate('click')

    const button = component.find(PopoverMenu).find('button').last()
    button.simulate('click')

    expect(component.find('div > div > div').first()).toHaveLength(0)
  })
})
