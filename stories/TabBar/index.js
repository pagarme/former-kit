import React from 'react'

import IconMyAccount from 'emblematic-icons/svg/User32.svg'
import IconDocs from 'emblematic-icons/svg/Folder32.svg'
import IconLetter from 'emblematic-icons/svg/Report32.svg'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { TabBar, TabItem } from '../../src/TabBar'
import Section from '../Section'

const i18n = {
  Docs: 'Docs',
  JustIcon: 'Icon',
  JustText: 'Text',
  Letter: 'Letter',
  MyAccount: 'My account',
  TabBar: 'TabBar',
  TextIcon: 'Text and Icon',
  ThisIs: 'This is: ',
}

const variantList = [
  { code: 'just-text', name: i18n.JustText },
  { code: 'text-icon', name: i18n.TextIcon },
  { code: 'just-icon', name: i18n.JustIcon },
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
    const { selected } = this.state
    const { variant } = this.props
    return (
      <TabBar
        variant={variant}
        selected={selected}
        onTabChange={this.changeTab}
      >
        <TabItem
          icon={<IconMyAccount width={16} height={16} />}
          text={i18n.MyAccount}
          onClick={clicked}
        >
          <h3>
            {i18n.ThisIs}
            {i18n.MyAccount}
            <IconMyAccount width={16} height={16} />
          </h3>
        </TabItem>
        <TabItem
          icon={<IconDocs width={16} height={16} />}
          text={i18n.Docs}
          onClick={clicked}
        >
          <h3>{i18n.ThisIs} {i18n.Docs} <IconDocs width={16} height={16} /></h3>
        </TabItem>
        <TabItem
          icon={<IconLetter width={16} height={16} />}
          text={i18n.Letter}
          onClick={clicked}
        >
          <h3>
            {i18n.ThisIs}
            {i18n.Letter}
            <IconLetter width={16} height={16} />
          </h3>
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

