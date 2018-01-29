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
                  fill="outline"
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
  theme: PropTypes.shape({
    sections: PropTypes.string,
  }),
  sections: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.element,
    action: PropTypes.func,
    actionTitle: PropTypes.string,
  })).isRequired,
}

SidebarSections.defaultProps = {
  theme: {},
}

export default consumeTheme(SidebarSections)
