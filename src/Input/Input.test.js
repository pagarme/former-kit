import React from 'react'
import { shallow } from 'enzyme'

import Input from './form'

describe('Input', () => {
  const value = 'Leonardo'
  const theme = {
    secondaryText: 'secondary',
    contentPresent: 'secondary',
  }

  describe('singleline', () => {
    it('should trigger onChange', () => {
      const onChange = jest.fn()

      const component = shallow(
        <Input
          name="name"
          label="Name"
          onChange={onChange}
        />
      )

      component
        .dive()
        .find('input')
        .first()
        .simulate('change', value)

      expect(onChange).toHaveBeenCalled()
      expect(onChange).toHaveBeenLastCalledWith(value)
    })

    it('should mount with disabled', () => {
      const onChange = jest.fn()

      const component = shallow(
        <Input
          name="name"
          label="Name"
          onChange={onChange}
          disabled
        />
      )

      component
        .find('input')
        .first()
        .simulate('change', value)

      expect(onChange).not.toHaveBeenCalled()
      expect(onChange).not.toHaveBeenLastCalledWith(value)
    })

    it('should mount with success', () => {
      const onChange = jest.fn()

      const component = shallow(
        <Input
          name="name"
          label="Name"
          onChange={onChange}
          success="Success"
          theme={theme}
        />
      )

      component
        .dive()
        .find('input')
        .first()
        .simulate('change', value)

      expect(onChange).toHaveBeenCalled()
      expect(onChange).toHaveBeenLastCalledWith(value)
      expect(component.dive().find('p').first().text()).toBe('Success')
    })

    it('should mount with error', () => {
      const onChange = jest.fn()

      const component = shallow(
        <Input
          name="name"
          label="Name"
          onChange={onChange}
          error="Error"
          theme={theme}
        />
      )

      component
        .dive()
        .find('input')
        .first()
        .simulate('change', value)

      expect(onChange).toHaveBeenCalled()
      expect(onChange).toHaveBeenLastCalledWith(value)
      expect(component.dive().find('p').first().text()).toBe('Error')
    })

    it('should mount with all props', () => {
      const onChange = jest.fn()

      const component = shallow(
        <Input
          name="name"
          label="Name"
          onChange={onChange}
          value="hihihi"
          type="password"
          placeholder="Your name"
          boxed
          hint="Hi"
          error="Error"
        />
      )

      component
        .dive()
        .find('input')
        .first()
        .simulate('change', value)

      expect(onChange).toHaveBeenCalled()
      expect(onChange).toHaveBeenLastCalledWith(value)
    })
  })

  describe('multiline', () => {
    it('should trigger onChange', () => {
      const onChange = jest.fn()

      const component = shallow(
        <Input
          name="name"
          label="Name"
          multiline
          onChange={onChange}
        />
      )

      component
        .dive()
        .find('textarea')
        .first()
        .simulate('change', value)

      expect(onChange).toHaveBeenCalled()
      expect(onChange).toHaveBeenLastCalledWith(value)
    })

    it('should mount with disabled', () => {
      const onChange = jest.fn()

      const component = shallow(
        <Input
          name="name"
          label="Name"
          onChange={onChange}
          multiline
          disabled
        />
      )

      component
        .dive()
        .find('textarea')
        .first()
        .simulate('change', value)

      expect(onChange).not.toHaveBeenCalled()
      expect(onChange).not.toHaveBeenLastCalledWith(value)
    })

    it('should mount with success', () => {
      const onChange = jest.fn()

      const component = shallow(
        <Input
          name="name"
          label="Name"
          onChange={onChange}
          multiline
          success="Success"
          theme={theme}
        />
      )

      component
        .dive()
        .find('textarea')
        .first()
        .simulate('change', value)

      expect(onChange).toHaveBeenCalled()
      expect(onChange).toHaveBeenLastCalledWith(value)
      expect(component.dive().find('p').first().text()).toBe('Success')
    })

    it('should mount with error', () => {
      const onChange = jest.fn()

      const component = shallow(
        <Input
          name="name"
          label="Name"
          onChange={onChange}
          multiline
          error="Error"
          theme={theme}
        />
      )

      component
        .dive()
        .find('textarea')
        .first()
        .simulate('change', value)

      expect(onChange).toHaveBeenCalled()
      expect(onChange).toHaveBeenLastCalledWith(value)
      expect(component.dive().find('p').first().text()).toBe('Error')
    })

    it('should mount with all props', () => {
      const onChange = jest.fn()

      const component = shallow(
        <Input
          name="name"
          label="Name"
          onChange={onChange}
          value="hihihi"
          type="text"
          placeholder="Your name"
          boxed
          hint="Hi"
          error="Error"
          multiline
        />
      )

      component
        .dive()
        .find('textarea')
        .first()
        .simulate('change', value)

      expect(onChange).toHaveBeenCalled()
      expect(onChange).toHaveBeenLastCalledWith(value)
    })
  })
})
