import React from 'react'
import { mount } from 'enzyme'
import {
  cleanup,
  render,
  fireEvent,
  waitForElement,
} from 'react-testing-library'

import moment from 'moment'

import DateInput from './index'

const presets = [
  {
    date: () => null,
    key: 'single',
    label: 'single',
    mode: 'single',
  },
  {
    date: () => null,
    key: 'period',
    label: 'period',
    mode: 'period',
  },
]

const initialDates = {
  end: moment().add(1, 'days'),
  start: moment(),
}

const testDateProp = (datesReceived, key, expected) => {
  expect(datesReceived).toHaveProperty(key)

  if (expected === null) {
    expect(datesReceived[key]).toBe(null)
  } else {
    expect(datesReceived[key]).not.toBe(null)
    expect(datesReceived[key]).toBeInstanceOf(moment)
    expect(datesReceived[key].format('L')).toBe(expected)
  }
}

const testDatesProp = (onChange, start, end) => {
  const { calls } = onChange.mock
  const lastCall = calls[calls.length - 1]
  const datesReceived = lastCall[0]

  testDateProp(datesReceived, 'start', start)
  testDateProp(datesReceived, 'end', end)
}

const inputText = (input, text) => {
  if (text === null) {
    const backspaceKey = 8
    const dateSize = 8
    for (let i = 0; i < dateSize; i += 1) {
      input.simulate('keypress', { key: backspaceKey })
    }
  } else {
    text.split('').forEach(key => input.simulate('keypress', { key }))
  }
}

const confirmInput = () => {
  const event = new KeyboardEvent('keydown', { key: 'Enter' })
  document.dispatchEvent(event)
}

describe('DateInput', () => {
  afterEach(cleanup)

  it('should mount with basic props', () => {
    const onConfirm = jest.fn()

    mount(
      <DateInput
        presets={[]}
        active
        onConfirm={onConfirm}
      />
    )
  })

  it('should render DateSelector when focused', async () => {
    const onChange = jest.fn()

    const { container } = render(
      <DateInput
        onConfirm={() => null}
        onChange={onChange}
        presets={presets}
        selectedPreset="period"
      />
    )

    let popoverContent = container.querySelector('ReactDates-overrides')
    expect(popoverContent).toBeNull()

    fireEvent.focus(container.querySelector('input'))

    popoverContent = await waitForElement(() => container.querySelector('.ReactDates-overrides'))

    expect(popoverContent).toBeDefined()
  })

  it('should call onConfirm when closed DateSelector', async () => {
    const onConfirm = jest.fn()

    const { container } = render(
      <div>
        <button className="outside-popover" type="button">Close!</button>
        <div>
          <DateInput
            onConfirm={onConfirm}
            presets={presets}
            value={{ end: null, start: null }}
          />
        </div>
      </div>
    )

    fireEvent.focus(container.querySelector('input'))

    fireEvent.click(container.querySelector('.outside-popover'))
    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('should return start and end properties', () => {
    const onChange = jest.fn()

    const component = mount(
      <DateInput
        onConfirm={() => null}
        onChange={onChange}
        presets={presets}
        selectedPreset="single"
        value={{ end: null, start: null }}
      />
    )

    const input = component.find('input')
    input.instance().value = moment().format('MM/DD/YYYY')
    input.simulate('change')

    const dates = onChange.mock.calls[0][0]

    expect(dates).toHaveProperty('start')
    expect(dates).toHaveProperty('end')

    expect(dates.start).toBeInstanceOf(moment)
    expect(dates.end).toBeInstanceOf(moment)

    expect(dates.start.toLocaleString())
      .toBe(moment().startOf('day').toLocaleString())
    expect(dates.end.toLocaleString())
      .toBe(moment().endOf('day').toLocaleString())
  })

  it('should show only one input when selectionMode is single', () => {
    const component = mount(
      <DateInput
        value={{ end: moment(), start: moment() }}
        onConfirm={() => {}}
        selectionMode="single"
      />
    )

    const inputs = component.find('input').length
    expect(inputs).toBe(1)
  })

  it('should show two inputs when selectionMode is period', () => {
    const component = mount(
      <DateInput
        onConfirm={() => null}
        value={{ end: moment().add(10, 'days'), start: moment() }}
        selectionMode="period"
      />
    )

    const inputs = component.find('input').length
    expect(inputs).toBe(2)
  })

  describe('when changing dates', () => {
    it('should call onChange when date is valid', () => {
      const onChange = jest.fn()

      const component = mount(
        <DateInput
          onConfirm={() => null}
          onChange={onChange}
          presets={presets}
        />
      )

      const startInput = component.find('input').at(0)
      startInput.instance().value = '02/01/201'
      startInput.simulate('change')
      expect(onChange).toBeCalledTimes(0)

      startInput.instance().value = moment().subtract(7, 'day').format('MM/DD/YYYY')
      startInput.simulate('change')

      expect(onChange).toBeCalledTimes(1)
    })

    it('should call onChange when end is valid', () => {
      const onChange = jest.fn()

      const component = mount(
        <DateInput
          onConfirm={() => null}
          onChange={onChange}
          presets={presets}
          selectionMode="period"
        />
      )

      const endInput = component.find('input').at(1)
      endInput.instance().value = moment().format('MM/DD/YYYY')
      endInput.simulate('change')

      expect(onChange).toBeCalledTimes(1)
    })

    it('should NOT call onChange when start date is outside the lower limit', () => {
      const onChange = jest.fn()

      const limits = {
        lower: moment().subtract(2, 'days'),
      }

      const component = mount(
        <DateInput
          onConfirm={() => null}
          onChange={onChange}
          presets={presets}
          value={initialDates}
          limits={limits}
        />
      )

      const startInput = component.find('input').at(0)
      startInput.simulate('focus')
      inputText(startInput, moment().subtract(10, 'days').format('L'))
      confirmInput()

      expect(onChange).not.toHaveBeenCalled()
    })

    it('should NOT call onChange when start date is outside the upper limit', () => {
      const onChange = jest.fn()

      const limits = {
        upper: moment().add(2, 'days'),
      }

      const component = mount(
        <DateInput
          onConfirm={() => null}
          onChange={onChange}
          presets={presets}
          value={initialDates}
          limits={limits}
        />
      )

      const startInput = component.find('input').at(0)
      startInput.simulate('focus')
      inputText(startInput, moment().add(10, 'days').format('L'))
      confirmInput()

      expect(onChange).not.toHaveBeenCalled()
    })

    it('should NOT call onChange when end date is outside the lower limit', () => {
      const onChange = jest.fn()

      const limits = {
        lower: moment().subtract(2, 'days'),
      }

      // made start day before end to be sure
      // the right rule is being tested
      const dates = {
        start: moment().subtract(20, 'days'),
      }

      const component = mount(
        <DateInput
          onConfirm={() => null}
          onChange={onChange}
          presets={presets}
          value={dates}
          limits={limits}
          selectionMode="period"
        />
      )

      const endInput = component.find('input').at(1)
      endInput.simulate('focus')
      inputText(endInput, moment().subtract(10, 'days').format('L'))
      confirmInput()

      expect(onChange).not.toHaveBeenCalled()
    })

    it('should NOT call onChange when end date is outside the upper limit', () => {
      const onChange = jest.fn()

      const limits = {
        upper: moment().add(2, 'days'),
      }

      const component = mount(
        <DateInput
          onConfirm={() => null}
          onChange={onChange}
          presets={presets}
          value={initialDates}
          limits={limits}
          selectionMode="period"
        />
      )

      const endInput = component.find('input').at(1)
      endInput.simulate('focus')
      inputText(endInput, moment().add(10, 'days').format('L'))
      confirmInput()

      expect(onChange).not.toHaveBeenCalled()
    })

    it('should call onChange when both date is inside limits', () => {
      const onChange = jest.fn()

      const limits = {
        lower: moment().subtract(20, 'days'),
        upper: moment().add(20, 'days'),
      }

      const component = mount(
        <DateInput
          onConfirm={() => null}
          onChange={onChange}
          presets={presets}
          value={initialDates}
          limits={limits}
          selectionMode="period"
        />
      )

      const start = moment().subtract(10, 'days').format('MM/DD/YYYY')
      const end = moment().add(10, 'days').format('MM/DD/YYYY')

      const startInput = component.find('input').at(0)
      startInput.instance().value = start
      startInput.simulate('change')

      const endInput = component.find('input').at(1)
      endInput.instance().value = end
      endInput.simulate('change')

      expect(onChange).toHaveBeenCalledTimes(2)
      testDatesProp(onChange, start, end)
    })
  })
})

