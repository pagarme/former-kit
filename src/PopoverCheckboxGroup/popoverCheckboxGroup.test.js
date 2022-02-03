import React, { useState } from 'react'
import {
  cleanup, fireEvent, render, wait, waitForElement,
} from 'react-testing-library'
import {
  arrayOf, func, string, bool,
} from 'prop-types'
import { Button } from '../index'
import PopoverCheckboxGroup from '.'

const PopoverCheckboxGroupExample = (
  { initialOnChange, initialVisibility, initialvalue }
) => {
  const [_value, setValue] = useState(initialvalue || [])
  const [visible, setVisible] = useState(initialVisibility || false)

  const props = {
    fieldKey: 'card_brand',
    label: 'Bandeiras',
    onChange: initialOnChange || (val => setValue(val)),
    options: [
      {
        label: 'Visa',
        value: 'visa',
      },
      {
        label: 'MasterCard',
        value: 'mastercard',
      },
      {
        label: 'Elo',
        value: 'elo',
      },
    ],
    popover: {
      onClickOutside: () => {},
      placement: 'bottomStart',
      visible,
    },
    value: _value,
  }

  return (
    <PopoverCheckboxGroup
      {...props}
    >
      <Button
        relevance="low"
        fill="outline"
        iconAlignment="end"
        onClick={() => setVisible((prevVisible => !prevVisible))}
      >
        Open
      </Button>
    </PopoverCheckboxGroup>
  )
}

PopoverCheckboxGroupExample.propTypes = {
  /**
   * Function to be called with the array of options
   * once a checkbox is clicked.
   */
  initialOnChange: func,
  /**
   * Array of strings comprising the currently selected options.
   */
  initialvalue: arrayOf(string),
  /**
   * The prop that indicates if the popover is visible or not.
   */
  initialVisibility: bool,
}

PopoverCheckboxGroupExample.defaultProps = {
  initialOnChange: undefined,
  initialvalue: undefined,
  initialVisibility: undefined,
}

describe('PopoverCheckboxGroup', () => {
  afterEach(cleanup)

  it('Should open PopoverCheckboxGroup when button is clicked once.', async () => {
    const { getByText, queryByText } = render(<PopoverCheckboxGroupExample />)
    const button = getByText('Open')
    let title = queryByText('Bandeiras')

    expect(title).toBeNull()

    fireEvent.click(button)

    title = await waitForElement(() => queryByText('Bandeiras'))

    expect(title).not.toBeNull()
  })

  it('Should close PopoverCheckboxGroup when button is clicked twice.', async () => {
    const { getByText, queryByText } = render(<PopoverCheckboxGroupExample />)
    const button = getByText('Open')
    let title = queryByText('Bandeiras')

    expect(title).toBeNull()

    fireEvent.click(button)

    title = await waitForElement(() => queryByText('Bandeiras'))

    expect(title).not.toBeNull()

    fireEvent.click(button)

    await wait(() => {
      expect(queryByText('Bandeiras')).toBeNull()
    }, { timeout: 500 })
  })

  it('Should call the onChange handler once an option has been clicked.', () => {
    const onChange = jest.fn()
    const { container } = render(
      <PopoverCheckboxGroupExample
        initialOnChange={onChange}
        initialVisibility
      />
    )

    const option = container.querySelector('#card_brand-mastercard-mastercard')

    fireEvent.click(option)

    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('Should select the \'mastercard\' option once it is clicked.', () => {
    const { container } = render(
      <PopoverCheckboxGroupExample initialVisibility />
    )
    let option = container.querySelector('#card_brand-mastercard-mastercard')

    fireEvent.click(option)

    option = container.querySelector('#card_brand-mastercard-mastercard')

    expect(option.checked).toEqual(true)
  })

  it('Should select the \'mastercard\' option once it is provided as the value prop.', () => {
    const { container } = render(
      <PopoverCheckboxGroupExample initialvalue={['mastercard']} initialVisibility />
    )
    const option = container.querySelector('#card_brand-mastercard-mastercard')

    expect(option.checked).toEqual(true)
  })

  it('Should unselect the \'mastercard\' option once it is clicked.', () => {
    const { container } = render(
      <PopoverCheckboxGroupExample initialvalue={['mastercard']} initialVisibility />
    )
    let option = container.querySelector('#card_brand-mastercard-mastercard')

    expect(option.checked).toEqual(true)

    fireEvent.click(option)

    option = container.querySelector('#card_brand-mastercard-mastercard')

    expect(option.checked).toEqual(false)
  })
})
