import React from 'react'
import { mount, shallow } from 'enzyme'
import { render } from 'react-testing-library'
import Pagination from './index'

const icons = {
  next: <svg />,
  previous: <svg />,
}

describe('Pagination', () => {
  it('should mount basic component', () => {
    const onChange = jest.fn()

    mount(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={onChange}
        icons={icons}
      />
    )
  })

  it('should not have page greater than totalPages', () => {
    let page = 1

    const component = mount(
      <Pagination
        currentPage={page}
        totalPages={3}
        onPageChange={(newPage) => { page = newPage }}
        icons={icons}
      />
    )

    const incButton = component.find('button').at(1)

    incButton.simulate('click')
    component.setProps({ currentPage: page })
    incButton.simulate('click')
    component.setProps({ currentPage: page })
    incButton.simulate('click')
    component.setProps({ currentPage: page })
    incButton.simulate('click')
    component.setProps({ currentPage: page })

    expect(page).toBe(3)
  })

  it('should not have page less than 1', () => {
    let page = 3

    const component = mount(
      <Pagination
        currentPage={page}
        totalPages={3}
        onPageChange={(newPage) => { page = newPage }}
        icons={icons}
      />
    )

    const decButton = component.find('button').at(0)

    decButton.simulate('click')
    component.setProps({ currentPage: page })
    decButton.simulate('click')
    component.setProps({ currentPage: page })
    decButton.simulate('click')
    component.setProps({ currentPage: page })
    decButton.simulate('click')
    component.setProps({ currentPage: page })

    expect(page).toBe(1)
  })

  it('should have correct page after 3 next clicks and 1 prev clicks', () => {
    let page = 4

    const component = mount(
      <Pagination
        currentPage={page}
        totalPages={10}
        onPageChange={(newPage) => { page = newPage }}
        icons={icons}
      />
    )

    const decButton = component.find('button').at(0)
    const incButton = component.find('button').at(1)

    incButton.simulate('click')
    component.setProps({ currentPage: page })
    incButton.simulate('click')
    component.setProps({ currentPage: page })
    incButton.simulate('click')
    component.setProps({ currentPage: page })
    decButton.simulate('click')
    component.setProps({ currentPage: page })

    expect(page).toBe(6)
  })

  it('should have prevButton disabled if currentPage is 1', () => {
    const component = mount(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={() => {}}
        icons={icons}
      />
    )

    const decButton = component.find('button').at(0)

    expect(decButton.prop('disabled')).toBe(true)
  })

  it('should not call prevButton if currentPage is 1', () => {
    const onChange = jest.fn()

    const component = mount(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={onChange}
        icons={icons}
      />
    )

    const decButton = component.find('button').at(0)
    decButton.simulate('click')

    expect(onChange).not.toHaveBeenCalled()
  })

  it('should not call nextButton if currentPage is the last', () => {
    const onChange = jest.fn()

    const component = mount(
      <Pagination
        currentPage={10}
        totalPages={10}
        onPageChange={onChange}
        icons={icons}
      />
    )

    const incButton = component.find('button').at(1)
    incButton.simulate('click')

    expect(onChange).not.toHaveBeenCalled()
  })

  it('should have nextButton disabled if currentPage is the last', () => {
    const component = mount(
      <Pagination
        currentPage={10}
        totalPages={10}
        onPageChange={() => {}}
        icons={icons}
      />
    )

    const incButton = component.find('button').at(1)

    expect(incButton.prop('disabled')).toBe(true)
  })

  it('should work with input', () => {
    let page = 2

    const component = mount(
      <Pagination
        currentPage={page}
        totalPages={10}
        onPageChange={(newPage) => { page = newPage }}
        icons={icons}
      />
    )

    const input = component.find('input').first()
    input.simulate('change', { target: { value: '4' } })
    input.simulate('blur')

    expect(page).toBe(4)
  })

  it('should have both buttons disabled if input is invalid', () => {
    let page = 2

    const component = mount(
      <Pagination
        currentPage={page}
        totalPages={10}
        onPageChange={(newPage) => { page = newPage }}
        icons={icons}
      />
    )

    const input = component.find('input').first()
    input.simulate('change', { target: { value: '34' } })

    const prevButton = component.find('button').at(0)
    const nextButton = component.find('button').at(1)

    expect(nextButton.prop('disabled')).toBe(true)
    expect(prevButton.prop('disabled')).toBe(true)
  })

  it('should have nextButton disabled if currentPage is equal to totalPages', () => {
    let page = 2

    const component = mount(
      <Pagination
        currentPage={page}
        totalPages={10}
        onPageChange={(newPage) => { page = newPage }}
        icons={icons}
      />
    )

    const input = component.find('input').first()
    input.simulate('change', { target: { value: '10' } })

    const prevButton = component.find('button').at(0)
    const nextButton = component.find('button').at(1)

    expect(nextButton.prop('disabled')).toBe(true)
    expect(prevButton.prop('disabled')).toBe(false)
  })

  it('should have currentPage equal to previous currentPage if input is greater than totalPages', () => {
    let page = 2

    const component = mount(
      <Pagination
        currentPage={page}
        totalPages={10}
        onPageChange={(newPage) => { page = newPage }}
        icons={icons}
      />
    )

    const input = component.find('input').first()
    input.simulate('change', { target: { value: '34' } })
    input.simulate('blur')
    expect(page).toBe(2)
  })

  it('should have prevButton disabled if currentPage is equal to 1', () => {
    let page = 2

    const component = mount(
      <Pagination
        currentPage={page}
        totalPages={10}
        onPageChange={(newPage) => { page = newPage }}
        icons={icons}
      />
    )

    const input = component.find('input').first()
    input.simulate('change', { target: { value: '1' } })

    const prevButton = component.find('button').at(0)
    const nextButton = component.find('button').at(1)

    expect(nextButton.prop('disabled')).toBe(false)
    expect(prevButton.prop('disabled')).toBe(true)
  })

  it('should have currentPage equal to previus currentPage if input is less than 1', () => {
    let page = 2

    const component = mount(
      <Pagination
        currentPage={page}
        totalPages={10}
        onPageChange={(newPage) => { page = newPage }}
        icons={icons}
      />
    )

    const input = component.find('input').first()
    input.simulate('change', { target: { value: '-3' } })
    input.simulate('blur')

    expect(page).toBe(2)
  })

  it('should work when Enter is pressed', () => {
    let page = 2

    const component = mount(
      <Pagination
        currentPage={page}
        totalPages={10}
        onPageChange={(newPage) => { page = newPage }}
        icons={icons}
      />
    )

    const input = component.find('input').first()
    input.simulate('change', { target: { value: '5' } })
    input.simulate('keydown', { key: 'Enter' })

    expect(page).toBe(5)
  })

  it('should not work with Enter if input is invalid', () => {
    let page = 3

    const component = mount(
      <Pagination
        currentPage={page}
        totalPages={10}
        onPageChange={(newPage) => { page = newPage }}
        icons={icons}
      />
    )

    let input = component.find('input').first()
    input.simulate('change', { target: { value: '14' } })
    input.simulate('keydown', { key: 'Enter' })
    input.simulate('keydown', { key: 'Enter' })
    input.simulate('keydown', { key: 'Enter' })

    input = component.find('input').first()

    expect(input.prop('value')).toBe('14')
    expect(page).toBe(3)
  })

  it('should remove first digit if it is zero', () => {
    let page = 3

    const component = mount(
      <Pagination
        currentPage={page}
        totalPages={10}
        onPageChange={(newPage) => { page = newPage }}
        icons={icons}
      />
    )

    let input = component.find('input').first()
    input.simulate('change', { target: { value: '08' } })

    input = component.find('input').first()

    expect(input.prop('value')).toBe('8')
  })

  it('should change inner state when currentPage changes', () => {
    const onChange = jest.fn()

    const component = shallow(
      <Pagination
        currentPage={20}
        totalPages={100}
        onPageChange={onChange}
        icons={icons}
      />
    ).dive()

    component.setProps({ totalPages: 12 })
    component.setProps({ currentPage: 2 })

    expect(onChange).not.toHaveBeenCalled()
    expect(component.state().inputPage).toBe(2)
  })

  it('should disable both buttons if props disabled is true', () => {
    const onChange = jest.fn()

    const component = shallow(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={onChange}
        icons={icons}
        disabled
      />
    ).dive()

    component.simulate('click')
    expect(onChange).not.toHaveBeenCalled()
    expect(component.find('input').prop('disabled')).toBe(true)
    expect(component.find('button').first().prop('disabled')).toBe(true)
    expect(component.find('button').at(1).prop('disabled')).toBe(true)
  })
})

describe('Pagination with single value', () => {
  it('should disable both buttons if props disabled is true', () => {
    const onChange = jest.fn()

    const component = shallow(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={onChange}
        icons={icons}
        format="single"
        disabled
      />
    ).dive()

    component.simulate('click')
    expect(onChange).not.toHaveBeenCalled()
    expect(component.find('input').prop('disabled')).toBe(true)
    expect(component.find('button').first().prop('disabled')).toBe(true)
    expect(component.find('button').at(1).prop('disabled')).toBe(true)
  })

  it('should have correct page after 3 next clicks and 1 prev clicks', () => {
    let page = 4

    const component = mount(
      <Pagination
        currentPage={page}
        totalPages={10}
        onPageChange={(newPage) => { page = newPage }}
        icons={icons}
        format="single"
      />
    )

    const decButton = component.find('button').at(0)
    const incButton = component.find('button').at(1)

    incButton.simulate('click')
    component.setProps({ currentPage: page })
    incButton.simulate('click')
    component.setProps({ currentPage: page })
    incButton.simulate('click')
    component.setProps({ currentPage: page })
    decButton.simulate('click')
    component.setProps({ currentPage: page })

    expect(page).toBe(6)
  })

  it('should render only the current page if the format is single', () => {
    const onChange = jest.fn()
    const page = 7
    const totalPages = 100

    const { container, getByText } = render(
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        icons={icons}
        onPageChange={onChange}
        format="single"
      />
    )

    const input = container.querySelector('input')
    expect(input).not.toBeNull()
    expect(parseInt(input.value, 10)).toBe(page)
    const pageNumber = getByText(`${totalPages}`)
    expect(pageNumber).not.toBeNull()
    const spanFound = container.querySelectorAll('label > span:first-child ~ span')
    expect(spanFound.length).toBe(0)
  })
})
