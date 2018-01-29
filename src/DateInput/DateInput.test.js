import React from 'react'
import { mount } from 'enzyme'

import moment from 'moment'

import DateInput from './index'
import DateSelector from '../DateSelector'
import Button from '../Button'

const presets = [{
  title: 'Últimos x dias',
  items: [{
    title: 'title 1',
    date: () => 1,
    key: 'k1',
  }, {
    title: 'title 2',
    date: () => 2,
    key: 'k2',
  }, {
    title: 'title 3',
    date: () => 3,
    key: 'k3',
  }],
}]

const initialDates = {
  start: moment(),
  end: moment().add(1, 'days'),
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
  const calls = onChange.mock.calls
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
    text.split('').forEach(key =>
      input.simulate('keypress', { key }))
  }
}

const confirmInput = () => {
  const event = new KeyboardEvent('keydown', { key: 'Enter' })
  document.dispatchEvent(event)
}

describe('DateInput', () => {
  it('should mount with basic props', () => {
    const onChange = jest.fn()

    mount(
      <DateInput
        presets={[]}
        active
        onChange={onChange}
      />
    )
  })

  it('should render DateSelector when focused', () => {
    const onChange = jest.fn()

    const component = mount(
      <DateInput
        onChange={onChange}
        presets={presets}
      />
    )

    let datePicker = component.find(DateSelector)
    expect(datePicker.length).toBe(0)

    component.find('input').at(0).simulate('focus')

    datePicker = component.find(DateSelector)
    expect(datePicker.length).toBe(1)
  })

  it('should call onChange when confirmed on DateSelector', () => {
    const onChange = jest.fn()

    const component = mount(
      <DateInput
        onChange={onChange}
        presets={presets}
        dates={{ start: null, end: null }}
      />
    )

    component.find('input').first().simulate('focus')
    component.find('ol input').at(0).simulate('change')
    component.find(Button).at(1).simulate('click')

    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('should return start and end properties', () => {
    const onChange = jest.fn()

    const component = mount(
      <DateInput
        onChange={onChange}
        presets={presets}
        dates={{ start: null, end: null }}
      />
    )

    component.find('input').first().simulate('focus')
    component.find('ol input').at(0).simulate('change')
    component.find(Button).at(1).simulate('click')

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

  it('should show only one input when start and end are defined and equal', () => {
    const component = mount(
      <DateInput
        dates={{ start: moment(), end: moment() }}
        onChange={() => {}}
      />
    )

    const inputs = component.find('input').length
    expect(inputs).toBe(1)
  })

  it('should show only one input when start and end are null', () => {
    const onChange = jest.fn()

    const component = mount(
      <DateInput
        onChange={onChange}
        dates={{ start: null, end: null }}
      />
    )

    const inputs = component.find('input').length
    expect(inputs).toBe(1)
  })

  it('should show two inputs when start and end are different', () => {
    const component = mount(
      <DateInput
        dates={{ start: moment(), end: moment().add(10, 'days') }}
        onChange={() => {}}
      />
    )

    const inputs = component.find('input').length
    expect(inputs).toBe(2)
  })

  it('should show two inputs when start is defined and end is null', () => {
    const component = mount(
      <DateInput
        dates={{ start: moment(), end: null }}
        onChange={() => {}}
      />
    )

    const inputs = component.find('input').length
    expect(inputs).toBe(2)
  })

  describe('when changing dates', () => {
    it('should call onChange when both are null', () => {
      const onChange = jest.fn()

      const component = mount(
        <DateInput
          onChange={onChange}
          presets={presets}
          dates={initialDates}
        />
      )

      const endInput = component.find('input').at(1)
      endInput.simulate('focus')
      inputText(endInput, null)
      confirmInput()

      const startInput = component.find('input').at(0)
      startInput.simulate('focus')
      inputText(startInput, null)
      confirmInput()

      expect(onChange).not.toHaveBeenCalled()
    })

    it('should call onChange when only end is null', () => {
      const onChange = jest.fn()

      const component = mount(
        <DateInput
          onChange={onChange}
          presets={presets}
        />
      )

      const start = moment().format('L')
      const expectedEnd = moment().format('L')

      const startInput = component.find('input').at(0)
      startInput.simulate('focus')
      inputText(startInput, start)
      confirmInput()

      const endInput = component.find('input').at(0)
      endInput.simulate('focus')
      inputText(endInput, null)
      confirmInput()

      expect(onChange).toHaveBeenCalledTimes(2)
      testDatesProp(onChange, start, expectedEnd)
    })

    it('should call onChange when end is greater than start', () => {
      const onChange = jest.fn()

      const startMoment = moment()
      const start = startMoment.format('L')
      const end = moment().add(10, 'days').format('L')

      const dates = {
        start: startMoment,
        end: moment().add(1, 'days'),
      }

      const component = mount(
        <DateInput
          onChange={onChange}
          presets={presets}
          dates={dates}
        />
      )

      const endInput = component.find('input').at(1)
      endInput.simulate('focus')
      inputText(endInput, end)
      confirmInput()

      expect(onChange).toHaveBeenCalledTimes(1)
      testDatesProp(onChange, start, end)
    })

    it('should NOT call onChange when start is greater than end', () => {
      const onChange = jest.fn()

      const dates = {
        start: moment(),
        end: moment().add(1, 'days'),
      }

      const component = mount(
        <DateInput
          onChange={onChange}
          presets={presets}
          dates={dates}
        />
      )

      const startInput = component.find('input').at(0)
      startInput.simulate('focus')
      inputText(startInput, moment().add(10, 'days').format('L'))
      confirmInput()

      expect(onChange).not.toHaveBeenCalled()
    })

    it('should NOT call onChange when start date is outside the lower limit', () => {
      const onChange = jest.fn()

      const limits = {
        lower: moment().subtract(2, 'days'),
      }

      const component = mount(
        <DateInput
          onChange={onChange}
          presets={presets}
          dates={initialDates}
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
          onChange={onChange}
          presets={presets}
          dates={initialDates}
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
          onChange={onChange}
          presets={presets}
          dates={dates}
          limits={limits}
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
          onChange={onChange}
          presets={presets}
          dates={initialDates}
          limits={limits}
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
          onChange={onChange}
          presets={presets}
          dates={initialDates}
          limits={limits}
        />
      )

      const start = moment().subtract(10, 'days').format('L')
      const end = moment().add(10, 'days').format('L')

      const startInput = component.find('input').at(0)
      startInput.simulate('focus')
      inputText(startInput, start)
      confirmInput()

      const endInput = component.find('input').at(1)
      endInput.simulate('focus')
      inputText(endInput, end)
      confirmInput()

      expect(onChange).toHaveBeenCalledTimes(2)
      testDatesProp(onChange, start, end)
    })
  })
})

