import React from 'react'
import { storiesOf } from '@storybook/react'

import Button from '../../src/Button'
import Spacing from '../../src/Spacing'
import Section from '../Section'

import styles from './style.css'

storiesOf('Spacing', module)
  .add('Default', () => (
    <div>
      <Section title="Flex">
        <div className={styles.flexContainer}>
          <Button>Button</Button>
          <Spacing />
          <Button>Button</Button>
        </div>
      </Section>

      <Section title="Tiny">
        <div className={styles.flexContainer}>
          <Button>Button</Button>
          <Spacing size="tiny" />
          <Button>Button</Button>
        </div>
      </Section>

      <Section title="Small">
        <div className={styles.flexContainer}>
          <Button>Button</Button>
          <Spacing size="small" />
          <Button>Button</Button>
        </div>
      </Section>

      <Section title="Medium">
        <div className={styles.flexContainer}>
          <Button>Button</Button>
          <Spacing size="medium" />
          <Button>Button</Button>
        </div>
      </Section>

      <Section title="Large">
        <div className={styles.flexContainer}>
          <Button>Button</Button>
          <Spacing size="large" />
          <Button>Button</Button>
        </div>
      </Section>
    </div>
  ))
