import React from 'react'
import {
  cleanup,
  fireEvent,
  render,
  wait,
  waitForElement,
} from 'react-testing-library'
import Popover from './Popover'
import PopoverMenu from './PopoverMenu'

const popoverComponent = (
  <Popover
    content={(
      <div id="content" className="content">
        <div id="batata">
          <strong>test@email.com</strong>
          <small>admin</small>
        </div>
        <PopoverMenu
          className="popoverMenu"
          items={[
            {
              action: () => undefined,
              title: 'Account',
            },
            {
              action: () => undefined,
              title: 'Logout',
            },
          ]}
        />
      </div>
    )}
  >
    <button type="button">click me</button>
  </Popover>
)

const defaultWaitTimeMs = 500

const waitExpect = (callback, timeMs = defaultWaitTimeMs) => wait(
  callback,
  { timeout: timeMs }
)

describe('Popover', () => {
  afterEach(cleanup)

  it('should render popover when button is clicked', async () => {
    const { container, getByText } = render(popoverComponent)
    const button = getByText('click me')
    let content = container.querySelector('#content')
    expect.assertions(2)

    expect(content).toBeNull()

    // open popover
    fireEvent.click(button)

    content = await waitForElement(() => container.querySelector('#content'))

    expect(content).not.toBeNull()
  })

  it('should remove popover when button is clicked', async () => {
    const { container, getByText } = render(popoverComponent)
    const button = getByText('click me')
    let content = container.querySelector('#content')

    expect(content).toBeNull()

    // open popover
    fireEvent.click(button)

    content = await waitForElement(() => container.querySelector('#content'))

    expect(content).toBeDefined()

    // close popover
    fireEvent.click(button)

    await waitExpect(
      () => {
        content = container.querySelector('#content')
        expect(content).toBeNull()
      }
    )
  })

  it('should remove popover when an menu item is clicked', async () => {
    const { container, getByText } = render(popoverComponent)
    const button = getByText('click me')
    let content = container.querySelector('#content')

    expect(content).toBeNull()

    // open popover
    fireEvent.click(button)

    const logoutButton = await waitForElement(() => getByText('Logout'), { container })

    // close popover
    fireEvent.click(logoutButton)

    content = container.querySelector('#content')
    expect(content).not.toBeNull()

    await waitExpect(
      () => {
        content = container.querySelector('content')
        expect(content).toBeNull()
      }
    )
  })
})
