import React from 'react'
import { shallow } from 'enzyme'
import MdMenu from 'react-icons/lib/md/menu'
import IconArrowUp from 'react-icons/lib/md/keyboard-arrow-up'
import IconArrowDown from 'react-icons/lib/md/keyboard-arrow-down'
import SidebarLink from './SidebarLink'

const arrowIcons = {
  collapse: <IconArrowUp />,
  expand: <IconArrowDown />,
}

describe('SidebarLink', () => {
  it('should mount with basic props', () => {
    shallow(
      <SidebarLink
        theme={{}}
        title="Hello"
      />
    )
  })

  it('should display title', () => {
    const component = shallow(
      <SidebarLink
        theme={{}}
        title="Hello"
      />
    )

    expect(component.dive().find('div').first().text()).toBe('Hello')
  })

  it('should display subtitle', () => {
    const component = shallow(
      <SidebarLink
        theme={{}}
        title="Hello"
        subtitle="Hi"
      />
    )

    expect(component.dive().find('div').at(2).text()).toBe('Hi')
  })

  it('should display icon', () => {
    const component = shallow(
      <SidebarLink
        theme={{}}
        title="Hello"
        icons={{
          link: <MdMenu />,
        }}
      />
    )

    expect(component.dive().find('svg').first().exists()).toBeTruthy()
  })

  it('should hide children when active with title', () => {
    const component = shallow(
      <SidebarLink
        theme={{}}
        title="Hello"
        icons={arrowIcons}
        active={false}
      >
        <p>Hi</p>
      </SidebarLink>
    )

    expect(component.dive().children()).toHaveLength(1)
  })

  it('should hide children when active with subtitle', () => {
    const component = shallow(
      <SidebarLink
        theme={{}}
        title="Hello"
        subtitle="Kaka"
        icons={arrowIcons}
        active={false}
      >
        <p>Hi</p>
      </SidebarLink>
    )

    expect(component.dive().children()).toHaveLength(1)
  })

  it('should display children when active with title', () => {
    const component = shallow(
      <SidebarLink
        theme={{}}
        title="Hello"
        icons={arrowIcons}
        active
      >
        <p>Hi</p>
      </SidebarLink>
    )

    expect(component.dive().children()).toHaveLength(2)
  })

  it('should display children when active with subtitle', () => {
    const component = shallow(
      <SidebarLink
        theme={{}}
        title="Hello"
        subtitle="Kaka"
        icons={arrowIcons}
        active
      >
        <p>Hi</p>
      </SidebarLink>
    )

    expect(component.dive().children()).toHaveLength(2)
  })

  it('should call onClick', () => {
    const onClick = jest.fn()

    const component = shallow(
      <SidebarLink
        theme={{}}
        title="Hello"
        icons={arrowIcons}
        onClick={onClick}
      >
        <p>Hi</p>
      </SidebarLink>
    )

    component.dive().find('[role="button"]').simulate('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('should render arrows when it has children and title', () => {
    const component = shallow(
      <SidebarLink
        theme={{}}
        title="Hello"
        icons={arrowIcons}
      >
        <p>Hi</p>
      </SidebarLink>
    )

    expect(component.dive().find('svg').first().exists()).toBeTruthy()
  })

  it('should render arrows when it has children and subtitle', () => {
    const component = shallow(
      <SidebarLink
        theme={{}}
        title="Hello"
        subtitle="Hihi"
        icons={arrowIcons}
      >
        <p>Hi</p>
      </SidebarLink>
    )

    expect(component.dive().find('svg').first().exists()).toBeTruthy()
  })

  it('should change arrows when item is active', () => {
    const componentActive = shallow(
      <SidebarLink
        theme={{}}
        title="Hello"
        active
        icons={arrowIcons}
      >
        <p>Hi</p>
      </SidebarLink>
    )

    const componentNotActive = shallow(
      <SidebarLink
        theme={{}}
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
        .find('MdKeyboardArrowUp')
        .exists()
    ).toBeTruthy()

    expect(
      componentNotActive
        .dive()
        .find('Arrow')
        .dive()
        .find('MdKeyboardArrowDown')
        .exists()
    ).toBeTruthy()
  })

  it('should display only icons when sidebar is collapsed', () => {
    const component = shallow(
      <SidebarLink
        theme={{}}
        title="Hello"
        icons={{
          link: <MdMenu />,
        }}
        collapsed
      />
    )

    expect(component.dive().find('p').first().text()).not.toBe('Hello')
  })
})
