import React from 'react'
import { shallow, mount } from 'enzyme'

import Input from './form'

describe('Input', () => {
  const value = 'Leonardo'
  const theme = {
    contentPresent: 'secondary',
    dark: 'dark',
    light: 'light',
    secondaryText: 'secondary',
  }

  describe('singleline', () => {
    it('should trigger onChange', () => {
      const onChange = jest.fn()

      const component = shallow(
        <Input
          name="name"
          label="Name"
          onChange={onChange}
          value=""
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
          value=""
        />
      )

      component
        .dive()
        .find('input')
        .first()
        .simulate('change', value)

      expect(onChange).not.toHaveBeenCalled()
      expect(onChange).not.toHaveBeenLastCalledWith(value)
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
          value=""
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

    it('should mount with a mask', () => {
      const onChange = jest.fn()

      const component = mount(
        <Input
          name="name"
          label="Name"
          onChange={onChange}
          value="4151 1124"
          type="password"
          placeholder="Your name"
          mask="1111 1111 1111 1111"
          hint="Hi"
          error="Error"
        />
      )

      expect(component.props().mask).not.toBeUndefined()
      expect(component.props().mask).toEqual('1111 1111 1111 1111')
      expect(component.html()).toContain('4151 1124 ____ ____')
    })

    it('should trigger onFocus', () => {
      const onChange = jest.fn()
      const onFocus = jest.fn()

      const component = shallow(
        <Input
          name="name"
          label="Name"
          onChange={onChange}
          onFocus={onFocus}
          value=""
        />
      )

      component
        .dive()
        .find('input')
        .first()
        .simulate('focus')

      expect(onFocus).toHaveBeenCalled()
    })

    it('should trigger onBlur', () => {
      const onChange = jest.fn()
      const onBlur = jest.fn()

      const component = shallow(
        <Input
          name="name"
          label="Name"
          onChange={onChange}
          onBlur={onBlur}
          value=""
        />
      )

      component
        .dive()
        .find('input')
        .first()
        .simulate('blur')

      expect(onBlur).toHaveBeenCalled()
    })

    it('should mount with dark base prop', () => {
      const onChange = jest.fn()

      const component = shallow(
        <Input
          base="dark"
          name="name"
          theme={theme}
          label="Name"
          onChange={onChange}
          value=""
        />
      )

      const div = component
        .dive()
        .find('div')
        .first()

      expect(div.hasClass('dark')).toBe(true)
    })

    it('should mount with light base prop', () => {
      const onChange = jest.fn()

      const component = shallow(
        <Input
          base="light"
          name="name"
          theme={theme}
          label="Name"
          onChange={onChange}
          value=""
        />
      )

      const div = component
        .dive()
        .find('div')
        .first()

      expect(div.hasClass('light')).toBe(true)
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
          value=""
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
          value=""
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
          value=""
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

    it('should not mount textarea with mask passed', () => {
      const onChange = jest.fn()
      // disables next line so when the assertion throws an error it doesn't log to the console
      console.error = jest.fn() // eslint-disable-line

      expect(shallow(
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
          mask="11/11/1111"
          multiline
        />
      ).dive).toThrow()
    })

    it('should mount a custom input using renderer', () => {
      const onChange = jest.fn()

      const expectedInputId = 'rendererInput'

      const renderer = props => (
        <input
          id={expectedInputId}
          {...props}
        />
      )

      const component = mount(
        <Input
          boxed
          error="Error"
          hint="Hi"
          label="Name"
          name="name"
          onChange={onChange}
          placeholder="Your name"
          renderer={renderer}
          type="text"
          value="hihihi"
        />
      )

      const input = component
        .find('input')
        .first()

      expect(input.props().id).toBe(expectedInputId)
    })
  })
})
