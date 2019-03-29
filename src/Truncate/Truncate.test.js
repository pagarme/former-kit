import React from 'react'
import {
  cleanup,
  render,
} from 'react-testing-library'
import 'jest-dom/extend-expect'
import ThemeProvider from '../ThemeProvider'
import Truncate from './index'

jest.mock(
  './matchTextToParentSize',
  () => jest.fn((text, parent, ellipsis) => {
    const lastCharsRegex = new RegExp(`.{${ellipsis.length}}$`)
    const newText = text.replace(lastCharsRegex, ellipsis)

    return {
      newText,
      isTruncated: true,
    }
  })
)

const theme = {
  styles: {
    UITruncate: {
      truncate: 'truncate',
    },
  },
}

const renderWithProvider = component => render(
  <ThemeProvider theme={theme}>{component}</ThemeProvider>
)

const originalText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'

describe('Truncate', () => {
  afterEach(cleanup)

  beforeEach(jest.resetModules)

  it('when is singleline', async () => {
    const { container } = renderWithProvider(
      <div style={{
          border: '1px solid',
          height: '20px',
          position: 'absolute',
          width: '200px',
          left: 0,
          top: 0,
        }}
      >
        <Truncate text={originalText} />
      </div>
    )

    const truncated = container.querySelector('.truncate')

    expect(truncated).toBeDefined()
    expect(truncated.innerHTML).toEqual(originalText)
  })

  it('when is multiline', async () => {
    const ellipsis = '...'
    const { container } = renderWithProvider(
      <div
        style={{
          border: '1px solid',
          height: '100px',
          position: 'absolute',
          width: '200px',
          left: 0,
          top: 0,
        }}
      >
        <Truncate
          ellipsis={ellipsis}
          multiline
          text={originalText}
        />
      </div>
    )

    const truncated = container.querySelector('div[name="truncate"]')
    expect(truncated.className).toBeFalsy()
    expect(truncated.innerHTML).not.toEqual(originalText)
    expect(truncated.innerHTML.indexOf(ellipsis)).toBeGreaterThan(0)
  })
})
