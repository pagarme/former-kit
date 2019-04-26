import React from 'react'
import { action } from '@storybook/addon-actions'

import IconCalendar from 'emblematic-icons/svg/Calendar32.svg'
import IconChart from 'emblematic-icons/svg/ChartBars32.svg'

import style from './style.css'

import {
  Card,
  CardTitle,
  CardContent,
  CardGraphic,
  CardActions,
  CardSection,
  CardSectionTitle,
} from '../../src/Card'

import Button from '../../src/Button'

const TitleText = () => (
  <div className={style.showcase}>
    <Card>
      <CardTitle
        title={<h2>Lorem ipsum <small>dolor sit amet</small></h2>}
        subtitle="Lorem ipsum"
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
        icon={<IconCalendar width={16} height={16} />}
        subtitle="Lorem ipsum"
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

const TitleCustomSubtitle = () => (
  <div className={style.showcase}>
    <Card>
      <CardTitle
        title="Lorem ipsum dolor sit amet"
        icon={<IconCalendar width={16} height={16} />}
        subtitle={(
          <h3>
            <IconChart width={16} height={16} />
            <span><strong>Lorem ipsum</strong> dolor sit amet</span>
          </h3>
        )}
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
        <CardSection>
          <CardSectionTitle title="Lorem ipsum dolor sit amet" />
          <CardContent>
            {loremIpsum}
          </CardContent>
          <hr />
          <CardContent>
            {loremIpsum}
          </CardContent>
        </CardSection>
      </CardContent>
    </Card>
  </div>
)

export default {
  GraphicTitleTextActions,
  SimpleSection,
  TitleCustomSubtitle,
  TitleIcon,
  TitleText,
  TitleTextActions,
  TitleTextAdvanced,
}
