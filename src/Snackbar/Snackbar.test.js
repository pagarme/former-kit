import React from 'react'
import {
  cleanup,
  fireEvent,
  render,
  wait,
} from 'react-testing-library'
import Snackbar from '.'
import ThemeProvider from '../ThemeProvider'

const theme = {
  styles: {
    UISnackbar: {
      error: 'error-color-red',
      info: 'info-color-purple',
      success: 'success-color-blue',
      warning: 'warning-color-yellow',
    },
  },
}

const renderWithProvider = component => render(
  <ThemeProvider theme={theme}>{component}</ThemeProvider>
)

const waitExpect = (callback, timeMs = 500) => wait(
  callback,
  { timeout: timeMs }
)

describe('snackbar', () => {
  afterEach(cleanup)

  it('should render snackbar of type error', () => {
    const { container } = renderWithProvider(
      <Snackbar
        type="error"
      >
        <p>Something went wrong!</p>
      </Snackbar>
    )
    const content = container.querySelector('p')
    expect(content).not.toBeNull()
    expect(content.innerHTML).toBe('Something went wrong!')
    expect(container.querySelector('.error-color-red')).not.toBeNull()
  })

  it('should render snackbar of type info', () => {
    const { container } = renderWithProvider(
      <Snackbar
        type="info"
      >
        <p>Settings saved successfully</p>
      </Snackbar>
    )
    const content = container.querySelector('p')
    expect(content).not.toBeNull()
    expect(content.innerHTML).toBe('Settings saved successfully')
    expect(container.querySelector('.info-color-purple')).not.toBeNull()
  })

  it('should render snackbar of type success', () => {
    const { container } = renderWithProvider(
      <Snackbar
        type="success"
      >
        <p>Settings saved successfully!</p>
      </Snackbar>
    )
    const content = container.querySelector('p')
    expect(content).not.toBeNull()
    expect(content.innerHTML).toBe('Settings saved successfully!')
    expect(container.querySelector('.success-color-blue')).not.toBeNull()
  })

  it('should render snackbar of type warning', () => {
    const { container } = renderWithProvider(
      <Snackbar
        type="warning"
      >
        <p>Warning! Something may not worked well...</p>
      </Snackbar>
    )
    const content = container.querySelector('p')
    expect(content).not.toBeNull()
    expect(content.innerHTML).toBe('Warning! Something may not worked well...')
    expect(container.querySelector('.warning-color-yellow')).not.toBeNull()
  })

  it('should render snackbar with icon', () => {
    const onDismiss = jest.fn()
    const { container } = renderWithProvider(
      <Snackbar
        icon={<svg height={12} width={12} />}
        onDismiss={onDismiss}
        type="warning"
      >
        <p>Warning! Something may not worked well...</p>
      </Snackbar>
    )
    const iconContent = container.querySelector('svg')
    expect(iconContent).not.toBeNull()
  })

  it('should close the snackbar using the close icon', async () => {
    const onDismiss = jest.fn()
    const { container } = render(
      <Snackbar
        icon={<svg height={12} width={12} />}
        onDismiss={onDismiss}
        type="warning"
      >
        <p>Warning! Something may not worked well...</p>
      </Snackbar>
    )
    const closeButton = container.querySelector('svg')
    let content = container.querySelector('p')

    expect(content).not.toBeNull()

    fireEvent.click(closeButton)

    await waitExpect(
      () => {
        content = container.querySelector('p')
        expect(content).toBeNull()
      }, 1000
    )
  })

  it('should close the snackbar after setTimeOut', async () => {
    const onDismiss = jest.fn()
    render(
      <Snackbar
        icon={<svg height={12} width={12} />}
        dismissTimeout={300}
        onDismiss={onDismiss}
        type="warning"
      >
        <p>Warning! Something may not worked well...</p>
      </Snackbar>
    )

    await waitExpect(
      () => {
        expect(onDismiss).toBeCalled()
      }, 1000
    )
  })
})
