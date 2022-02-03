import React from 'react'
import {
  arrayOf,
  bool,
  func,
  node,
  shape,
  string,
  oneOf,
} from 'prop-types'
import { Popover, PopoverContent } from '../Popover'
import CheckboxGroup from '../CheckboxGroup'
import ThemeConsumer from '../ThemeConsumer'

const ConsumeTheme = ThemeConsumer('UIPopoverCheckboxGroup')

const PopoverCheckboxGroup = ({
  children, fieldKey, label, onChange, options, popover, theme, value,
}) => (
  <Popover
    content={(
      <div className={theme.container}>
        <PopoverContent>
          <h3 className={theme.title}>{label}</h3>
          <CheckboxGroup
            options={options}
            value={value}
            name={fieldKey}
            onChange={onChange}
          />
        </PopoverContent>
      </div>
      )}
    {...popover}
  >
    {children}
  </Popover>
)

PopoverCheckboxGroup.propTypes = {
  /**
   * The element that will receive popover
   */
  children: node,
  /**
   * Field key.
   */
  fieldKey: string.isRequired,
  /**
   * The title to be displayed in the popover content.
   */
  label: string.isRequired,
  /**
   * Function to be called with the array of options
   * once a checkbox is clicked.
   */
  onChange: func.isRequired,
  /**
   * The options to be displayed in the checkbox group
   */
  options: arrayOf(shape({
    label: string,
    value: string,
  })).isRequired,
  /**
   * Props to be forwarded to the Popover component.
   */
  popover: shape({
    /**
   * Popover set arrow.
   */
    arrow: bool,
    /**
   * Popover base theme.
   */
    base: string,
    /**
   * The element that will receive popover
   */
    children: node,
    /**
   * The element should close when click outside popover.
   */
    closeWhenClickOutside: bool,
    /**
   * The popover content.
   */
    content: node,
    /**
   * on click function.
   */
    onClick: func,
    /**
   * on click function.
   */
    onClickOutside: func,
    /**
   * The popover position when it's visible
   */
    placement: oneOf([
      'rightStart',
      'rightMiddle',
      'rightEnd',
      'topStart',
      'bottomStart',
      'bottomCenter',
      'bottomEnd',
      'topCenter',
      'leftStart',
      'leftMiddle',
      'leftEnd',
      'topEnd',
    ]),
    /**
   * The prop that indicates if the popover is visible or not.
   */
    visible: bool,
  }).isRequired,
  /**
    * @see [ThemeProvider](#themeprovider) - Theme received from `consumeTheme` wrapper.
    */
  theme: shape({
    container: string,
    title: string,
  }),
  /**
   * Array of strings comprising the currently selected options.
   */
  value: arrayOf(string).isRequired,
}

PopoverCheckboxGroup.defaultProps = {
  children: undefined,
  theme: {},
}

export default ConsumeTheme(PopoverCheckboxGroup)
