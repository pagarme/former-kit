import React from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'

import ThemeConsumer from '../ThemeConsumer'
import Button from '../Button'

const consumeTheme = ThemeConsumer('UISidebar')

class SidebarSections extends React.PureComponent {
  constructor () {
    super()
    this.id = shortid.generate()
  }

  render () {
    const {
      sections,
      theme,
    } = this.props

    return (
      <div className={theme.sections}>
        <ul>
          {sections.map(section => (
            <li key={`${this.id}-${section.title}`}>
              <p>{section.title}</p>
              <div>{section.value}</div>

              {section.actionTitle &&
                <Button
                  onClick={section.action}
                  size="tiny"
                >
                  {section.actionTitle}
                </Button>}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

SidebarSections.propTypes = {
  /**
   * The style classes for this element.
   */
  theme: PropTypes.shape({
    /**
     * The main class used to stylize the component.
     */
    sections: PropTypes.string,
  }),
  /**
   * The sections that will be rendered.
   */
  sections: PropTypes.arrayOf(PropTypes.shape({
    /**
     * The function that will be called when the section receives
     * a click. It receives the 'event' object as an argument.
     * @param {object} event - the default event object.
     */
    action: PropTypes.func,
    /**
     * The title that describes the action.
     */
    actionTitle: PropTypes.string,
    /**
     * The title of the section.
     */
    title: PropTypes.string,
    /**
     * The value of the section.
     */
    value: PropTypes.element,
  })).isRequired,
}

SidebarSections.defaultProps = {
  theme: {},
}

export default consumeTheme(SidebarSections)
