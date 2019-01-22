import React from 'react'
import { mount, shallow } from 'enzyme'
import { cleanup, render, fireEvent, waitForElement, wait } from 'react-testing-library'
import moment from 'moment'
import CalendarInput from './index'

const defaultDates = {
  start: moment('2018-06-27'),
  end: moment('2018-06-27'),
}

const defaultWaitTimeMs = 500

const waitExpect = (callback, timeMs = defaultWaitTimeMs) =>
  wait(callback, { timeout: timeMs })

const getCalendarInput = (onChange = () => undefined) => (
  <CalendarInput
    dateSelection="single"
    months={1}
    onChange={onChange}
    value={defaultDates}
  />
)

describe('DateSelector', () => {
  it('should mount component', () => {
    shallow(getCalendarInput())
  })

  it('should return start and end properties', () => {
    const onChange = jest.fn()

    const component = mount(
      <CalendarInput
        onChange={onChange}
        dateSelection="period"
        months={1}
        value={{ end: null, start: null }}
      />
    )

    component
      .find('input')
      .first()
      .simulate('focus')
      .simulate('change', { target: { value: '06/27/2018' } })

    component
      .find('input')
      .at(1)
      .simulate('focus')
      .simulate('change', { target: { value: '06/28/2018' } })


    expect(onChange).toHaveBeenCalledTimes(2)

    const dates = onChange.mock.calls[1][0]

    expect(dates).toHaveProperty('start')
    expect(dates).toHaveProperty('end')

    expect(dates.start).toBeInstanceOf(moment)
    expect(dates.end).toBeInstanceOf(moment)

    expect(dates.start.toLocaleString())
      .toBe(moment('06/27/2018', 'L').startOf('day').toLocaleString())
    expect(dates.end.toLocaleString())
      .toBe(moment('06/28/2018', 'L').endOf('day').toLocaleString())
  })

  it('should show only one input when the dateSelection is "single"', () => {
    const component = mount(getCalendarInput())

    const inputs = component.find('input').length
    expect(inputs).toBe(1)
  })

  it('should show only two input when the dateSelection is "period"', () => {
    const component = mount(
      <CalendarInput
        dateSelection="period"
        months={1}
        onChange={() => undefined}
        value={defaultDates}
      />
    )

    const inputs = component.find('input').length
    expect(inputs).toBe(2)
  })

  describe('events', () => {
    afterEach(cleanup)

    it('should call onChange when a date is changed', async () => {
      const onChange = jest.fn()
      const { container } = render(getCalendarInput(onChange))
      const input = container.querySelector('input')

      fireEvent.focus(input)

      const calendarButton = await waitForElement(() =>
        container.querySelector('.CalendarMonth .CalendarDay__default'))

      fireEvent.click(calendarButton)

      expect(onChange).toHaveBeenCalledTimes(1)
    })

    it('should render the Calendar when focused', async () => {
      const { container } = render(getCalendarInput())
      let calendar = container.querySelector('.ReactDates-overrides .CalendarMonth')
      const input = container.querySelector('input')

      expect(calendar).toBeNull()

      fireEvent.focus(input)

      calendar = await waitForElement(() =>
        container.querySelector('.ReactDates-overrides .CalendarMonth')
      )

      expect(calendar).not.toBeNull()
    })

    it('should show two calendars when the months props is 2', async () => {
      const { container } = render(
        <CalendarInput
          dateSelection="period"
          months={2}
          onChange={() => undefined}
          value={defaultDates}
        />)
      let calendars = container.querySelectorAll('.CalendarMonthGrid > .CalendarMonthGrid_month__horizontal')
      let weekHeaders = container.querySelectorAll('.DayPicker_weekHeaders > .DayPicker_weekHeader')
      const input = container.querySelector('input')

      expect(calendars).toHaveLength(0)

      fireEvent.focus(input)

      await waitExpect(() => {
        calendars = container.querySelectorAll('.CalendarMonthGrid > .CalendarMonthGrid_month__horizontal')
        weekHeaders = container.querySelectorAll('.DayPicker_weekHeaders > .DayPicker_weekHeader')

        expect(weekHeaders).toHaveLength(2)
        expect(calendars).toHaveLength(4)
      })
    })
  })
})

