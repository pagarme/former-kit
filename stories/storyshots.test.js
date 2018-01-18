import initStoryshots, { snapshotWithOptions } from '@storybook/addon-storyshots'
import MockDate from 'mockdate'
import React from 'react'

MockDate.set(1506815400000)

function createNodeMock (element) {
  if (element.type) {
    return {
      __consolidated_events_handlers__: null,
      addEventListener: () => 1,
      querySelectorAll: () => [],
      style: {
        height: 0,
      },
    }
  }

  return null
}

initStoryshots({
  test: snapshotWithOptions({
    createNodeMock,
  }),
})

jest.mock('react-dom', () => ({
  findDOMNode: () => ({
    querySelector: () => null,
  }),
}))

global.getComputedStyle = () => ({
  styleSheets: {},
})


jest.mock('former-kit-skin-pagarme', () => {
  const buildProxy = value =>
    new Proxy(
      {},
      { get: (_, name) => value || name }
    )

  return {
    name: 'Pagar.me',
    theme: buildProxy(buildProxy()),
  }
})

jest.mock('shortid', () => ({
  generate: () => 'shortid-mock',
}))

jest.mock('react-modal', () => (
  ({ children }) => (
    <div className="modal">{children}</div>
  )
))

