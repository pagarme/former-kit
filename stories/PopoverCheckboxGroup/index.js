import React, { useState } from 'react'
import ChevronDown32 from 'emblematic-icons/svg/ChevronDown32.svg'
import ChevronUp32 from 'emblematic-icons/svg/ChevronUp32.svg'
import { storiesOf } from '@storybook/react'
import { arrayOf, string } from 'prop-types'
import PopoverCheckboxGroup from '../../src/PopoverCheckboxGroup'
import Button from '../../src/Button'
import styles from './style.css'

const PopoverCheckboxGroupExample = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue || [])
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => setVisible(prevVisible => !prevVisible)

  const props = {
    fieldKey: 'card_brand',
    label: 'Bandeiras',
    onChange: val => setValue(val),
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
      closeWhenClickOutside: true,
      onClickOutside: toggleVisibility,
      placement: 'bottomStart',
      visible,
    },
    value,
  }

  return (
    <div className={styles.container}>
      <PopoverCheckboxGroup {...props}>
        <Button
          relevance="low"
          fill="outline"
          iconAlignment="end"
          icon={visible
            ? <ChevronUp32 width={16} height={16} />
            : <ChevronDown32 width={16} height={16} />
        }
          onClick={toggleVisibility}
        >
        Open
        </Button>
      </PopoverCheckboxGroup>
      <div className={styles.selected}>
        Selected: {value.join(',')}
      </div>
    </div>
  )
}

PopoverCheckboxGroupExample.propTypes = {
  initialValue: arrayOf(string),
}

PopoverCheckboxGroupExample.defaultProps = {
  initialValue: undefined,
}

storiesOf('PopoverCheckboxGroup', module)
  .add('Default', () => (<PopoverCheckboxGroupExample />))
  .add('Already selected', () => (
    <PopoverCheckboxGroupExample initialValue={['mastercard']} />
  ))
