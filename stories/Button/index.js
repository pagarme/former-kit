import React from 'react'

import IconAdd from 'react-icons/lib/fa/plus'

import { storiesOf } from '@storybook/react'

import Button from '../../src/Button'

import styles from './style.css'

storiesOf('Buttons', module)
  .add('defaultTheme', () => (
    <div className={styles.container}>
      <h2>Default Button</h2>

      <div className={styles.spacingAround}>
        <Button>Call to Action</Button>
        <Button relevance="high">Call to Action</Button>
        <Button relevance="low">Call to Action</Button>
      </div>

      <h2>Gradient</h2>
      <div className={styles.spacingAround}>
        <Button fill="gradient">Call to Action</Button>
        <Button relevance="high" fill="gradient">Call to Action</Button>
      </div>

      <h2>Outline Button</h2>

      <div className={styles.spacingAround}>
        <Button fill="outline">Call to Action</Button>
        <Button relevance="high" fill="outline">Call to Action</Button>
        <Button relevance="low" fill="outline">Call to Action</Button>
      </div>

      <h2>Clean Button</h2>

      <div className={styles.spacingAround}>
        <Button fill="clean">Call to Action</Button>
        <Button relevance="high" fill="clean">Call to Action</Button>
        <Button relevance="low" fill="clean">Call to Action</Button>
      </div>

      <h2>All buttons with icons</h2>

      <div className={styles.spacingAround}>
        <Button icon={<IconAdd />} />
        <Button icon={<IconAdd />} >Call to Action</Button>
        <Button icon={<IconAdd />} relevance="high">Call to Action</Button>
        <Button icon={<IconAdd />} relevance="low">Call to Action</Button>
      </div>

      <div className={styles.spacingAround}>
        <Button icon={<IconAdd />} fill="gradient" />
        <Button icon={<IconAdd />} fill="gradient">Call to Action</Button>
        <Button icon={<IconAdd />} relevance="high" fill="gradient">Call to Action</Button>
      </div>

      <div className={styles.spacingAround}>
        <Button icon={<IconAdd />} fill="outline" />
        <Button icon={<IconAdd />} fill="outline">Call to Action</Button>
        <Button icon={<IconAdd />} relevance="high" fill="outline">Call to Action</Button>
        <Button icon={<IconAdd />} relevance="low" fill="outline">Call to Action</Button>
      </div>

      <div className={styles.spacingAround}>
        <Button icon={<IconAdd />} fill="clean" />
        <Button icon={<IconAdd />} fill="clean">Call to Action</Button>
        <Button icon={<IconAdd />} relevance="high" fill="clean">Call to Action</Button>
        <Button icon={<IconAdd />} relevance="low" fill="clean">Call to Action</Button>
      </div>


      <h2>Sizes</h2>

      <div className={styles.spacingAround}>
        <Button size="tiny">tiny</Button>
        <Button icon={<IconAdd />} size="tiny" />
      </div>

      <div className={styles.spacingAround}>
        <Button size="small">small</Button>
        <Button icon={<IconAdd />} size="small" />
      </div>

      <div className={styles.spacingAround}>
        <Button>default</Button>
        <Button icon={<IconAdd />} size="default" />
      </div>

      <div className={styles.spacingAround}>
        <Button size="large">large</Button>
        <Button icon={<IconAdd />} size="large" />
      </div>

      <h2>All disabled</h2>

      <div className={styles.spacingAround}>
        <Button icon={<IconAdd />} disabled />
        <Button icon={<IconAdd />} disabled>Call to Action</Button>
        <Button icon={<IconAdd />} relevance="high" disabled>Call to Action</Button>
        <Button icon={<IconAdd />} relevance="low" disabled>Call to Action</Button>
      </div>

      <div className={styles.spacingAround}>
        <Button icon={<IconAdd />} fill="gradient" disabled />
        <Button icon={<IconAdd />} fill="gradient" disabled>Call to Action</Button>
        <Button icon={<IconAdd />} relevance="high" fill="gradient" disabled>Call to Action</Button>
      </div>

      <div className={styles.spacingAround}>
        <Button icon={<IconAdd />} fill="outline" disabled />
        <Button icon={<IconAdd />} fill="outline" disabled>Call to Action</Button>
        <Button icon={<IconAdd />} relevance="high" fill="outline" disabled>Call to Action</Button>
        <Button icon={<IconAdd />} relevance="low" fill="outline" disabled>Call to Action</Button>
      </div>

      <div className={styles.spacingAround}>
        <Button icon={<IconAdd />} fill="clean" disabled />
        <Button icon={<IconAdd />} fill="clean" disabled>Call to Action</Button>
        <Button icon={<IconAdd />} relevance="high" fill="clean" disabled>Call to Action</Button>
        <Button icon={<IconAdd />} relevance="low" fill="clean" disabled>Call to Action</Button>
      </div>
    </div>
  ))
