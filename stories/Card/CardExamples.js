import React from 'react'
import { action } from '@storybook/addon-actions'

import Icon from 'react-icons/lib/md/insert-invitation'

import style from './style.css'

import {
  Card,
  CardTitle,
  CardContent,
  CardGraphic,
  CardActions,
  CardSection,
} from '../../src/Card'

import Button from '../../src/Button'

const TitleText = () => (
  <div className={style.showcase}>
    <Card>
      <CardTitle
        title="Lorem ipsum dolor sit amet"
      />
      <CardContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
        venenatis placerat lacus et pretium. Aenean porttitor mi odio, vel
        blandit nulla malesuada et. Duis a tellus quis est iaculis accumsan.
        In diam est, egestas eu lobortis eu, laoreet ut tortor. Sed mattis
        sapien vel malesuada sodales. Curabitur hendrerit purus sed ex
        feugiat hendrerit. Vivamus eleifend odio a congue consectetur.
      </CardContent>
    </Card>
  </div>
)

const TitleIcon = () => (
  <div className={style.showcase}>
    <Card>
      <CardTitle
        title="Lorem ipsum dolor sit amet"
        icon={<Icon />}
      />
      <CardContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
        venenatis placerat lacus et pretium. Aenean porttitor mi odio, vel
        blandit nulla malesuada et. Duis a tellus quis est iaculis accumsan.
        In diam est, egestas eu lobortis eu, laoreet ut tortor. Sed mattis
        sapien vel malesuada sodales. Curabitur hendrerit purus sed ex
        feugiat hendrerit. Vivamus eleifend odio a congue consectetur.
      </CardContent>
    </Card>
  </div>
)

const TitleTextActions = () => (
  <div className={style.showcase}>
    <Card>
      <CardTitle
        title="Lorem ipsum dolor sit amet"
      />
      <CardContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
        venenatis placerat lacus et pretium. Aenean porttitor mi odio, vel
        blandit nulla malesuada et. Duis a tellus quis est iaculis accumsan.
        In diam est, egestas eu lobortis eu, laoreet ut tortor. Sed mattis
        sapien vel malesuada sodales. Curabitur hendrerit purus sed ex
        feugiat hendrerit. Vivamus eleifend odio a congue consectetur.
      </CardContent>
      <CardActions>
        <Button>Action</Button>
        <Button>Action</Button>
        <Button>Action</Button>
        <Button>Action</Button>
      </CardActions>
    </Card>
  </div>
)

const GraphicTitleTextActions = () => (
  <div className={style.showcase}>
    <Card>
      <CardGraphic>
        <img
          src="https://maxicharts.com/wp-content/uploads/2017/07/banner-1544x500.png"
          alt="placeholder"
        />
      </CardGraphic>
      <CardTitle
        title="Lorem ipsum dolor sit amet"
      />
      <CardContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
        venenatis placerat lacus et pretium. Aenean porttitor mi odio, vel
        blandit nulla malesuada et. Duis a tellus quis est iaculis accumsan.
        In diam est, egestas eu lobortis eu, laoreet ut tortor. Sed mattis
        sapien vel malesuada sodales. Curabitur hendrerit purus sed ex
        feugiat hendrerit. Vivamus eleifend odio a congue consectetur.
      </CardContent>
      <CardActions>
        <Button>Action</Button>
        <Button>Action</Button>
        <Button>Action</Button>
        <Button>Action</Button>
      </CardActions>
    </Card>
  </div>
)

const TitleTextAdvanced = () => (
  <div className={style.showcase}>
    <Card>
      <CardTitle
        title="Click here and watch the action logger"
        onClick={action('toggle handler')}
      />
      <CardContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
        venenatis placerat lacus et pretium. Aenean porttitor mi odio, vel
        blandit nulla malesuada et. Duis a tellus quis est iaculis accumsan.
        In diam est, egestas eu lobortis eu, laoreet ut tortor. Sed mattis
        sapien vel malesuada sodales. Curabitur hendrerit purus sed ex
        feugiat hendrerit. Vivamus eleifend odio a congue consectetur.
      </CardContent>
      <CardActions>
        <Button>Action</Button>
        <Button>Action</Button>
        <Button>Action</Button>
        <Button>Action</Button>
      </CardActions>
    </Card>
  </div>
)

const loremIpsum = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
venenatis placerat lacus et pretium. Aenean porttitor mi odio, vel
blandit nulla malesuada et. Duis a tellus quis est iaculis accumsan.
In diam est, egestas eu lobortis eu, laoreet ut tortor. Sed mattis
sapien vel malesuada sodales. Curabitur hendrerit purus sed ex
feugiat hendrerit. Vivamus eleifend odio a congue consectetur.
`

const SimpleSection = () => (
  <div className={style.showcase}>
    <Card>
      <CardTitle title="Lorem title" />

      <CardContent>
        <CardSection
          title="Lorem ipsum dolor sit amet"
        >
          {loremIpsum}
        </CardSection>
      </CardContent>
    </Card>
  </div>
)

class CollapsableSection extends React.Component {
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
            <CardSection
              title="Title opened"
              collapsedTitle="Title collapsed"
              collapsed={this.state.collapsed}
              onTitleClick={
                collapsed => this.setState({ collapsed: !collapsed })
              }
              subTitle="It's over 9000!"
            >
              {loremIpsum}
            </CardSection>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default {
  TitleText,
  TitleIcon,
  TitleTextActions,
  GraphicTitleTextActions,
  TitleTextAdvanced,
  CollapsableSection,
  SimpleSection,
}
