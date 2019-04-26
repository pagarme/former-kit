import React from 'react'
import style from './style.css'

import {
  Card,
  CardTitle,
  CardContent,
  CardSection,
  CardSectionTitle,
} from '../../src/Card'

const loremIpsum = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
venenatis placerat lacus et pretium. Aenean porttitor mi odio, vel
blandit nulla malesuada et. Duis a tellus quis est iaculis accumsan.
In diam est, egestas eu lobortis eu, laoreet ut tortor. Sed mattis
sapien vel malesuada sodales. Curabitur hendrerit purus sed ex
feugiat hendrerit. Vivamus eleifend odio a congue consectetur.
`

class CardSectionTitleState extends React.Component {
  constructor (props) {
    super(props)
    this.state = { collapsed: false }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    const { collapsed } = this.state
    this.setState({
      collapsed: !collapsed,
    })
  }

  renderTitle () {
    const { collapsed } = this.state
    const title = collapsed ? 'Title collapsed' : 'Title opened'
    return (
      <CardSectionTitle
        title={title}
        collapsed={collapsed}
        onClick={this.handleClick}
        subtitle="It's over 9000!"
      />
    )
  }

  render () {
    const { collapsed } = this.state
    return (
      <div className={style.showcase}>
        <Card>
          <CardTitle title="Lorem title" />
          <CardContent>
            <CardSection>
              {!collapsed && (
                <CardContent>
                  {loremIpsum}
                </CardContent>
              )}
              {this.renderTitle()}
            </CardSection>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default CardSectionTitleState
