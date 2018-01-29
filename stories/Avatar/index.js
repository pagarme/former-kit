import React from 'react'
import { storiesOf } from '@storybook/react'
import FaUser from 'react-icons/lib/fa/user-md'

import Avatar from '../../src/Avatar'
import styles from './styles.css'

storiesOf('Avatar', module)
  .add('All types', () => (
    <div className={styles.box}>
      <Avatar icons={{placeholder: <FaUser size={26} />}} />
      <Avatar photo="https://i.imgur.com/V9mgrCp.jpg" />
      <Avatar
        photo="https://i.imgur.com/V9mgrCp.jpg"
        size={50}
      />
    </div>
  ))

