import React from 'react'

import IconMyAccount from 'emblematic-icons/svg/User32.svg'
import IconDocs from 'emblematic-icons/svg/Folder32.svg'
import IconLetter from 'emblematic-icons/svg/Report32.svg'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { TabBar, TabItem } from '../../src/TabBar'
import Section from '../Section'

const i18n = {
  TabBar: 'TabBar',
  MyAccount: 'My account',
  Docs: 'Docs',
  Letter: 'Letter',
  JustText: 'Text',
  TextIcon: 'Text and Icon',
  JustIcon: 'Icon',
  ThisIs: 'This is: ',
}

const variantList = [
  { name: i18n.JustText, code: 'just-text' },
  { name: i18n.TextIcon, code: 'text-icon' },
  { name: i18n.JustIcon, code: 'just-icon' },
]

const clicked = action('clicked')

class Tab extends React.Component {
  constructor (props) {
    super(props)
    this.state = { selected: 1 }
    this.changeTab = this.changeTab.bind(this)
  }

  changeTab (selected) {
    this.setState({ selected })
  }

  render () {
    return (
      <TabBar
        variant={this.props.variant}
        selected={this.state.selected}
        onTabChange={this.changeTab}
      >
        <TabItem
          icon={<IconMyAccount width={16} height={16} />}
          text={i18n.MyAccount}
          onClick={clicked}
        >
          <h1>{i18n.ThisIs} {i18n.MyAccount} <IconMyAccount width={16} height={16} /></h1>
        </TabItem>
        <TabItem
          icon={<IconDocs width={16} height={16} />}
          text={i18n.Docs}
          onClick={clicked}
        >
          <h2>{i18n.ThisIs} {i18n.Docs} <IconDocs width={16} height={16} /></h2>
        </TabItem>
        <TabItem
          icon={<IconLetter width={16} height={16} />}
          text={i18n.Letter}
          onClick={clicked}
        >
          <h3>{i18n.ThisIs} {i18n.Letter} <IconLetter width={16} height={16} /></h3>
        </TabItem>
      </TabBar>
    )
  }
}

storiesOf(`${i18n.TabBar}`, module)
  .add('Default', () => (
    <div>
      {variantList.map(variant => (
        <Section title={variant.name} key={variant.name}>
          <Tab variant={variant.code} />
        </Section>
      ))}
    </div>
  ))

