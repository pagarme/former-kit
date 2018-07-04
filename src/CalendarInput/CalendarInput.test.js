import React from 'react'
import { mount, shallow } from 'enzyme'
import moment from 'moment'
import CalendarInput from './index'
import Calendar from '../Calendar'

const defaultDates = {
  start: moment('2018-06-27'),
  end: moment('2018-06-27'),
}

describe('DateSelector', () => {
  it('should mount component', () => {
    shallow(
      <CalendarInput
        dateSelection="single"
        months={1}
        onChange={() => undefined}
        value={defaultDates}
      />
    )
  })

  it('should render the Calendar when focused', () => {
    const onChange = jest.fn()

    const component = mount(
      <CalendarInput
        dateSelection="single"
        months={1}
        onChange={onChange}
        value={defaultDates}
      />
    )

    let datePicker = component.find(Calendar)
    expect(datePicker.length).toBe(0)

    component.find('input').at(0).simulate('focus')

    datePicker = component.find(Calendar)
    expect(datePicker.length).toBe(1)
  })

  it('should call onChange when a date is changed', () => {
    const onChange = jest.fn()

    const component = mount(
      <CalendarInput
        dateSelection="single"
        months={1}
        onChange={onChange}
        value={defaultDates}
      />
    )

    component.find('input').first().simulate('focus')
    component
      .find(Calendar)
      .find('td button')
      .at(0)
      .simulate('click')

    expect(onChange).toHaveBeenCalledTimes(1)
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
      .toBe(moment('06/27/2018').startOf('day').toLocaleString())
    expect(dates.end.toLocaleString())
      .toBe(moment('06/28/2018').endOf('day').toLocaleString())
  })

  it('should show only one input when the dateSelection is "single"', () => {
    const component = mount(
      <CalendarInput
        dateSelection="single"
        months={1}
        onChange={() => undefined}
        value={defaultDates}
      />
    )

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

  it('should show two calendars when the months props is 2', () => {
    const component = mount(
      <CalendarInput
        dateSelection="period"
        months={2}
        onChange={() => undefined}
        value={defaultDates}
      />
    )
    component.find('input').first().simulate('focus')
    const calendarsLength = component
      .find(Calendar)
      .find('.CalendarMonthGrid .CalendarMonth[data-visible=true]')
      .length
    expect(calendarsLength).toBe(2)
  })
})

