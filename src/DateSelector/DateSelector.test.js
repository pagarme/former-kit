import React from 'react'
import {
  cleanup,
  render,
  fireEvent,
  waitForElement,
} from 'react-testing-library'
import moment from 'moment'

import DateSelector from './index'

const presets = [
  {
    key: 'today',
    label: 'today',
    date: () => 0,
    mode: 'single',
  },
  {
    key: 'single',
    label: 'single',
    date: () => null,
    mode: 'single',
  },
  {
    key: 'period',
    label: 'period',
    date: () => null,
    mode: 'period',
  },
  {
    key: 'last',
    label: 'last',
    mode: 'period',
    list: [
      {
        key: 'last-7',
        label: 'last 7',
        date: () => -7,
        mode: 'period',
      },
    ],
  },
]

const defaultDates = {
  start: moment(),
  end: moment(),
}

class RenderWithButtons extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      visible: false,
    }

    this.toggleVisible = this.toggleVisible.bind(this)
  }

  toggleVisible () {
    this.setState({
      visible: !this.state.visible,
    })
  }

  render () {
    return (
      <div>
        <button id="close-button" onClick={this.toggleVisible}>Close!</button>
        <DateSelector
          {...this.props}
          visible={this.state.visible}
        >
          <button id="open-button" onClick={this.toggleVisible}>Open!</button>
        </DateSelector>
      </div>
    )
  }
}

const waitForPopover = container =>
  waitForElement(() => container.querySelector('.ReactDates-overrides'))

describe('DateSelector', () => {
  afterEach(cleanup)

  it('should mount component', () => {
    render(
      <RenderWithButtons
        presets={presets}
        dates={defaultDates}
        focusedInput="startDate"
        onConfirm={() => null}
        onChange={() => null}
      />
    )
  })

  it('should call onConfirm', async () => {
    const onConfirm = jest.fn()

    const { container } = render(
      <RenderWithButtons
        presets={presets}
        dates={defaultDates}
        focusedInput="startDate"
        onConfirm={onConfirm}
        onChange={() => null}
      />
    )

    fireEvent.click(container.querySelector('#open-button'))

    await waitForPopover(container)

    fireEvent.click(container.querySelector('#close-button'))

    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('should return { start, end } onChange', async () => {
    const onChange = jest.fn()

    const { container } = render(
      <RenderWithButtons
        presets={presets}
        dates={defaultDates}
        focusedInput="startDate"
        onConfirm={() => null}
        onChange={onChange}
      />
    )

    fireEvent.click(container.querySelector('#open-button'))

    await waitForPopover(container)

    fireEvent.click(
      container
        .querySelector('table tr:nth-child(3) td:nth-child(1)')
    )

    expect(onChange).toHaveBeenCalledTimes(1)

    const onChangeParams = onChange.mock.calls[0][0]
    expect(onChangeParams.start).toBeInstanceOf(moment)
    expect(onChangeParams.end).toBeInstanceOf(moment)
  })

  it('should return a seven-day interval onChange', async () => {
    const onChange = jest.fn()

    const { container } = render(
      <RenderWithButtons
        presets={presets}
        dates={defaultDates}
        focusedInput="startDate"
        selectionMode="period"
        onConfirm={() => null}
        onChange={onChange}
      />
    )

    fireEvent.click(container.querySelector('#open-button'))

    await waitForPopover(container)

    const { name } = container.querySelector('input[type="radio"]')
    fireEvent.click(container.querySelector(`input[type="radio"]#${name}last-7`))

    expect(onChange).toHaveBeenCalledTimes(1)

    const onChangeParams = onChange.mock.calls[0][0]
    expect(
      onChangeParams.start.isSame(moment().subtract(7, 'day'), 'day')
    ).toBeTruthy()

    expect(
      onChangeParams.end.isSame(moment(), 'day')
    ).toBeTruthy()
  })

  it('should return null when unchanged', async () => {
    const datesNull = {
      end: null,
      start: null,
    }

    const onConfirm = jest.fn()

    const { container } = render(
      <RenderWithButtons
        presets={presets}
        dates={datesNull}
        focusedInput="startDate"
        onConfirm={onConfirm}
        onChange={() => null}
      />
    )

    fireEvent.click(container.querySelector('#open-button'))

    await waitForPopover(container)

    fireEvent.click(container.querySelector('#close-button'))

    expect(onConfirm).toHaveBeenCalledTimes(1)

    const onConfirmParams = onConfirm.mock.calls[0][0]

    expect(onConfirmParams.start).toBeNull()
    expect(onConfirmParams.end).toBeNull()
  })

  it('should render TODAY preset when selected preset is today', async () => {
    const onConfirm = jest.fn()

    const { container } = render(
      <RenderWithButtons
        presets={presets}
        focusedInput="startDate"
        selectedPreset="today"
        onConfirm={onConfirm}
        onChange={() => null}
      />
    )

    fireEvent.click(container.querySelector('#open-button'))

    await waitForPopover(container)

    fireEvent.click(container.querySelector('#close-button'))

    expect(onConfirm).toHaveBeenCalledTimes(1)

    const onConfirmParams = onConfirm.mock.calls[0][0]

    const now = moment()

    expect(onConfirmParams.start.isSame(now.startOf('day'))).toBeTruthy()
    expect(onConfirmParams.end.isSame(now.endOf('day'))).toBeTruthy()
  })

  it('should return startOf and endOf day when selecting single day', async () => {
    const onChange = jest.fn()

    const { container } = render(
      <RenderWithButtons
        presets={presets}
        focusedInput="startDate"
        onConfirm={() => null}
        onChange={onChange}
      />
    )

    fireEvent.click(container.querySelector('#open-button'))

    await waitForPopover(container)

    const now = moment()
    fireEvent.click(
      container
        .querySelector(`td[aria-label="${now.format('dddd, MMMM D, YYYY')}"]`)
    )

    expect(onChange).toHaveBeenCalledTimes(1)

    const onChangeParams = onChange.mock.calls[0][0]

    expect(onChangeParams.start.isSame(now.startOf('day'))).toBeTruthy()
    expect(onChangeParams.end.isSame(now.endOf('day'))).toBeTruthy()
  })
})
