import React, { Fragment } from 'react'
import { action } from '@storybook/addon-actions'

import IconCalendar from 'emblematic-icons/svg/Calendar32.svg'

import {
  Card,
  CardTitle,
  CardContent,
  CardSection,
  CardSectionDoubleLineTitle,
} from '../../src/Card'

import {
  Popover,
  PopoverMenu,
} from '../../src/Popover'

import Button from '../../src/Button'

import style from './style.css'

const loremIpsum = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
venenatis placerat lacus et pretium. Aenean porttitor mi odio, vel
blandit nulla malesuada et. Duis a tellus quis est iaculis accumsan.
In diam est, egestas eu lobortis eu, laoreet ut tortor. Sed mattis
sapien vel malesuada sodales. Curabitur hendrerit purus sed ex
feugiat hendrerit. Vivamus eleifend odio a congue consectetur.
`
const items = [
  {
    title: 'Minha Conta',
    action: () => action('account'),
  },
  {
    title: 'Logout',
    action: () => action('logout'),
  },
]

const renderActions = () => (
  <Fragment>
    <Button
      fill="outline"
      icon={<IconCalendar width={16} height={16} />}
      key="Item 1"
      onClick={() => action('item 1')}
      size="default"
    />

    <Fragment>
      <Popover
        content={
          <Fragment>
            <div>
              <strong>Teste</strong>
            </div>
            <PopoverMenu items={items} />
          </Fragment>
        }
      >
        <Button
          fill="outline"
          onClick={() => action('item 2')}
          size="default"
        >
          Actions
        </Button>
      </Popover>
    </Fragment>
  </Fragment>
)


export default class CardSectionDoubleLineTitleState extends React.Component {
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
            <CardSection>
              <CardSectionDoubleLineTitle
                actions={renderActions()}
                collapsed={this.state.collapsed}
                icon={<IconCalendar width={16} height={16} />}
                onClick={
                  () => this.setState({ collapsed: !this.state.collapsed })
                }
                subtitle="Verifique ou edite as informações da sua empresa"
                title={this.state.collapsed ? 'Title collapsed' : 'Title opened'}
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
