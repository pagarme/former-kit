import React from 'react'
import { shallow, mount } from 'enzyme'
import moment from 'moment'
import IconArrowLeft from 'react-icons/lib/fa/angle-left'
import IconArrowRight from 'react-icons/lib/fa/angle-right'

import DateSelector from './index'
import Button from '../Button'

const presets = [
  {
    title: 'Últimos:',
    items: [
      {
        key: 'last-7',
        title: '7 dias',
        date: () => -7,
      },
    ],
  },
]

const defaultDates = {
  start: moment(),
  end: moment(),
}

const icons = {
  previousMonth: <IconArrowLeft />,
  nextMonth: <IconArrowRight />,
}

describe('DateSelector', () => {
  it('should mount component', () => {
    shallow(
      <DateSelector
        presets={presets}
        dates={defaultDates}
        focusedInput="startDate"
        icons={icons}
      />
    )
  })

  it('should render presets with default presets', () => {
    const component = mount(
      <DateSelector
        presets={presets}
        dates={defaultDates}
        icons={icons}
      />
    )

    expect(component.find('ol li input').length).toBe(4)
  })

  it('should render buttons in default translation', () => {
    const component = mount(
      <DateSelector
        presets={presets}
        dates={defaultDates}
        icons={icons}
      />
    )

    expect(component.find(Button).at(0).text()).toBe('cancel')
    expect(component.find(Button).at(1).text()).toBe('confirm period')
  })

  it('should render buttons in portuguese', () => {
    const component = mount(
      <DateSelector
        presets={presets}
        dates={defaultDates}
        strings={{
          cancel: 'Cancelar',
          confirmPeriod: 'Confirmar período',
        }}
        icons={icons}
      />
    )

    expect(component.find(Button).at(0).text()).toBe('Cancelar')
    expect(component.find(Button).at(1).text()).toBe('Confirmar período')
  })

  it('should call onConfirm', () => {
    const onConfirm = jest.fn()

    const component = mount(
      <DateSelector
        presets={presets}
        dates={defaultDates}
        focusedInput="startDate"
        onConfirm={onConfirm}
        icons={icons}
      />
    )

    component
      .find(Button)
      .at(1)
      .simulate('click')

    const lastOnConfirmCalledWith = onConfirm.mock.calls[0][0]

    expect(lastOnConfirmCalledWith.start).toBeInstanceOf(moment)
    expect(lastOnConfirmCalledWith.end).toBeInstanceOf(moment)
  })

  it('should call onCancel', () => {
    const onCancel = jest.fn()

    const component = mount(
      <DateSelector
        presets={presets}
        dates={defaultDates}
        focusedInput="startDate"
        onCancel={onCancel}
        icons={icons}
      />
    )

    component
      .find(Button)
      .first()
      .simulate('click')

    expect(onCancel).toHaveBeenCalled()
  })

  it('should return { start, end } onChange', () => {
    const onChange = jest.fn()

    const component = mount(
      <DateSelector
        presets={presets}
        dates={defaultDates}
        focusedInput="startDate"
        onChange={onChange}
        icons={icons}
      />
    )

    component
      .find('li')
      .at(1)
      .find('input')
      .simulate('change')

    const dateReceived = onChange.mock.calls[0][0]

    expect(onChange).toHaveBeenCalled()
    expect(dateReceived.start).toBeInstanceOf(moment)
    expect(dateReceived.end).toBeInstanceOf(moment)
  })

  it('should return a seven-day interval', () => {
    const onChange = jest.fn()

    const component = mount(
      <DateSelector
        presets={presets}
        dates={defaultDates}
        focusedInput="startDate"
        onChange={onChange}
        icons={icons}
      />
    )

    component
      .find('li')
      .at(1)
      .find('input')
      .simulate('change')

    const { start, end } = onChange.mock.calls[0][0]
    const startDate = moment(start)
    const endDate = moment(end)

    const dateDiff = startDate.diff(endDate, 'days')

    expect(dateDiff).toBe(-7)
  })

  it('should call onFocusChange', () => {
    const focusedInputHistory = []

    class TestComponent extends React.Component {
      constructor () {
        super()

        this.state = {
          dates: {},
          focusedInput: 'startDate',
        }

        this.onFocusChange = this.onFocusChange.bind(this)
        this.onChange = this.onChange.bind(this)
      }

      onFocusChange (focusedInput) {
        focusedInputHistory.push(focusedInput)
        this.setState({ focusedInput })
      }

      onChange (dates) {
        this.setState({ dates })
      }

      render () {
        return (
          <DateSelector
            presets={presets}
            dates={this.state.dates}
            focusedInput={this.state.focusedInput}
            onFocusChange={this.onFocusChange}
            onChange={this.onChange}
            icons={icons}
          />
        )
      }
    }

    const component = mount(<TestComponent />)

    // select period preset
    component
      .find('ol input')
      .last()
      .simulate('change')

    // chose the startDate
    component.find('table').at(2).find('button').at(4)
      .simulate('click')
    expect(focusedInputHistory[0]).toBe('endDate')

    // chose the endDate
    component.find('table').at(2).find('button').at(10)
      .simulate('click')
    expect(focusedInputHistory[1]).toBe('startDate')
  })

  it("should work when 'dates' is null", () => {
    const datesNull = {
      end: null,
      start: null,
    }

    const onChange = jest.fn()

    const component = mount(
      <DateSelector
        presets={presets}
        dates={datesNull}
        focusedInput="startDate"
        onChange={onChange}
        icons={icons}
      />
    )

    component
      .find('li')
      .at(1)
      .find('input')
      .simulate('change')

    const dateReceived = onChange.mock.calls[0][0]

    expect(onChange).toHaveBeenCalled()
    expect(dateReceived.start).toBeInstanceOf(moment)
    expect(dateReceived.end).toBeInstanceOf(moment)
  })

  it('should render SINGLE preset when start and end are null', () => {
    const dates = { start: null, end: null }

    const component = mount(
      <DateSelector
        presets={presets}
        dates={dates}
        focusedInput="startDate"
        icons={icons}
      />
    )

    expect(component.find('input').at(2).props().checked).toBeTruthy()
  })

  it('should render TODAY preset when start and end are today', () => {
    const dates = { start: moment(), end: moment() }

    const component = mount(
      <DateSelector
        presets={presets}
        dates={dates}
        focusedInput="startDate"
        icons={icons}
      />
    )

    expect(component.find('input').at(0).props().checked).toBeTruthy()
  })

  it('should render RANGE preset when start and end are different', () => {
    const dates = { start: moment(), end: moment().add(10, 'days') }

    const component = mount(
      <DateSelector
        presets={presets}
        dates={dates}
        focusedInput="startDate"
        icons={icons}
      />
    )

    expect(component.find('input').at(3).props().checked).toBeTruthy()
  })

  it('should render RANGE preset with only start date when end is null', () => {
    const dates = { start: moment(), end: null }

    const component = mount(
      <DateSelector
        presets={presets}
        dates={dates}
        focusedInput="startDate"
        icons={icons}
      />
    )

    expect(component.find('input').at(3).props().checked).toBeTruthy()
  })
})
