import React from 'react'
import { shallow, mount } from 'enzyme'
import moment from 'moment'
import { DayPickerRangeController } from 'react-dates'

import Calendar from './index'

const defaultDates = {
  start: moment('2018-06-27'),
  end: moment('2018-06-27'),
}

describe('DateSelector', () => {
  it('should mount component', () => {
    shallow(
      <Calendar
        dates={defaultDates}
        months={1}
        onChange={() => undefined}
        dateSelection="single"
      />
    )
  })

  it('should mount two months', () => {
    const component = mount(
      <Calendar
        dates={defaultDates}
        months={2}
        onChange={() => undefined}
        dateSelection="single"
      />
    )
    const months = component
      .find('.CalendarMonthGrid .CalendarMonth')
      .findWhere(node => node.props()['data-visible'])

    expect(months.length).toBe(2)
  })

  it('should mount a period selector', () => {
    const component = mount(
      <Calendar
        dates={defaultDates}
        months={2}
        onChange={() => undefined}
        dateSelection="period"
      />
    )

    const rangeController = component.find(DayPickerRangeController)

    expect(rangeController.exists()).toBe(true)
  })

  it('should trigger onChange when a date is clicked', () => {
    const onChange = jest.fn()
    const component = mount(
      <Calendar
        dates={defaultDates}
        months={1}
        onChange={onChange}
        dateSelection="single"
      />
    )

    component
      .find('.CalendarMonthGrid .CalendarDay--valid button')
      .at(1)
      .simulate('click')

    const onChangeCalledWith = onChange.mock.calls[0][0]

    expect(onChangeCalledWith.start).toBeInstanceOf(moment)
    expect(onChangeCalledWith.end).toBeInstanceOf(moment)
  })
})
