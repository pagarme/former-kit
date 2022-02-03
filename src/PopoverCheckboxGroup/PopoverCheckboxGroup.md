#### **Example** ####

```jsx
const PopoverCheckboxGroupExample = () => {
  const [value, setValue] = useState([])
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => setVisible(prevVisible => !prevVisible)

  const props = {
    data: {
      items: [
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
      key: 'card_brand',
      name: 'Bandeiras',
    },
    onChange: val => setValue(val),
    popover: {
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
```