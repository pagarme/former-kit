import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
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
  PopoverContent,
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
    action: () => action('account'),
    title: 'Minha Conta',
  },
  {
    action: () => action('logout'),
    title: 'Logout',
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
        content={(
          <div>
            <PopoverContent>
              <strong>Teste</strong>
            </PopoverContent>
            <PopoverMenu items={items} />
          </div>
        )}
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

class CardSectionDoubleLineTitleState extends Component {
  constructor () {
    super()
    this.state = { collapsed: false }
  }

  render () {
    const { collapsed } = this.state
    const { subtitle } = this.props
    return (
      <div className={style.showcase}>
        <Card>
          <CardTitle title="Lorem title" />

          <CardContent>
            <CardSection>
              <CardSectionDoubleLineTitle
                actions={renderActions()}
                collapsed={collapsed}
                icon={<IconCalendar width={16} height={16} />}
                onClick={
                  () => this.setState({ collapsed: !collapsed })
                }
                subtitle={subtitle}
                title={collapsed ? 'Title collapsed' : 'Title opened'}
              />
              {!collapsed && <CardContent>{loremIpsum}</CardContent>}
            </CardSection>
          </CardContent>
        </Card>
      </div>
    )
  }
}

CardSectionDoubleLineTitleState.propTypes = {
  subtitle: PropTypes.node,
}

CardSectionDoubleLineTitleState.defaultProps = {
  subtitle: null,
}

export default CardSectionDoubleLineTitleState
