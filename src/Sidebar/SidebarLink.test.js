import React from 'react'
import { shallow, mount } from 'enzyme'
import SidebarLink from './SidebarLink'

const arrowIcons = {
  collapse: <svg />,
  expand: <svg />,
}

describe('SidebarLink', () => {
  it('should mount with basic props', () => {
    shallow(
      <SidebarLink
        title="Hello"
      />
    )
  })

  it('should display title', () => {
    const component = shallow(
      <SidebarLink
        title="Hello"
      />
    )

    expect(component.dive().find('div').first().text()).toBe('Hello')
  })

  it('should display icon', () => {
    const component = shallow(
      <SidebarLink
        title="Hello"
        icon={<svg />}
      />
    )

    expect(component.dive().find('svg').first().exists()).toBeTruthy()
  })

  it('should render without display children', () => {
    const component = shallow(
      <SidebarLink
        title="Hello"
        icons={arrowIcons}
      >
        <SidebarLink title="General" />
        <SidebarLink title="Logout" />
      </SidebarLink>
    )

    expect(component.dive().children()).toHaveLength(1)
  })

  it('should render submenu', () => {
    const component = shallow(
      <SidebarLink
        title="Account"
        icons={arrowIcons}
      >
        <SidebarLink title="General" />
      </SidebarLink>
    )

    expect(component.children()).toHaveLength(1)
  })

  it('should hide children when submenu is collapsed', () => {
    const component = shallow(
      <SidebarLink
        title="Hello"
        icons={arrowIcons}
        active={false}
      >
        <p>Hi</p>
      </SidebarLink>
    )

    expect(component.dive().children()).toHaveLength(1)
  })

  it('shoul call onClick', () => {
    const onClick = jest.fn()

    const component = shallow(
      <SidebarLink
        title="Hello"
        icons={arrowIcons}
        onClick={onClick}
      />
    )

    component.dive().find('button').simulate('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('should call onClick when has children', () => {
    const onClick = jest.fn()

    const component = shallow(
      <SidebarLink
        title="Hello"
        icons={arrowIcons}
        onClick={onClick}
      >
        <p>Hi</p>
      </SidebarLink>
    )

    component.dive().find('button').simulate('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('should render arrows when it has children and title', () => {
    const component = mount(
      <SidebarLink
        title="Hello"
        icons={arrowIcons}
      >
        <p>Hi</p>
      </SidebarLink>
    )

    expect(component.find('svg').first().exists()).toBeTruthy()
  })

  it('should render arrows when it has children and subtitle', () => {
    const component = mount(
      <SidebarLink
        title="Hello"
        subtitle="Hihi"
        icons={arrowIcons}
      >
        <p>Hi</p>
      </SidebarLink>
    )

    expect(component.find('svg').first().exists()).toBeTruthy()
  })

  it('should change arrows when item is active', () => {
    const componentActive = shallow(
      <SidebarLink
        title="Hello"
        active
        icons={arrowIcons}
      >
        <p>Hi</p>
      </SidebarLink>
    )

    const componentNotActive = shallow(
      <SidebarLink
        title="Hello"
        active={false}
        icons={arrowIcons}
      >
        <p>Hi</p>
      </SidebarLink>
    )

    expect(
      componentActive
        .dive()
        .find('Arrow')
        .dive()
        .find('svg')
        .exists()
    ).toBeTruthy()

    expect(
      componentNotActive
        .dive()
        .find('Arrow')
        .dive()
        .find('svg')
        .exists()
    ).toBeTruthy()
  })

  it('should display only icons when sidebar is collapsed', () => {
    const component = mount(
      <SidebarLink
        title="Hello"
        icon={<svg />}
        collapsed
      />
    )

    expect(component.find('p').first().exists()).toBeFalsy()
  })
})
