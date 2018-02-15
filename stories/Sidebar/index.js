import React from 'react'
import { storiesOf } from '@storybook/react'

import SidebarState from './SidebarState'

storiesOf('Sidebar', module)
  .add('Default', () => <SidebarState />)
