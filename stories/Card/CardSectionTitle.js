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

export default class CardSectionTitleState extends React.Component {
  constructor (props) {
    super(props)
    this.state = { collapsed: false }
  }

  render () {
    return (
      <div className={style.showcase}>
        <Card>
          <CardTitle title="Lorem title" />

          <CardContent>
            <CardSection >
              <CardSectionTitle
                title={this.state.collapsed ? 'Title collapsed' : 'Title opened'}
                collapsed={this.state.collapsed}
                onClick={
                  collapsed => this.setState({ collapsed: !collapsed })
                }
                subtitle="It's over 9000!"
              />
              {!this.state.collapsed &&
                <CardContent>
                  {loremIpsum}
                </CardContent>
              }
            </CardSection>
          </CardContent>
        </Card>
      </div>
    )
  }
}
