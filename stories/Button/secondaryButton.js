import React from 'react'

import IconAdd from 'emblematic-icons/svg/Add24.svg'

import { storiesOf } from '@storybook/react'

import SecondaryButton from '../../src/Button/SecondaryButton'
import Section from '../Section'

import styles from './style.css'

storiesOf('Buttons', module)
  .add('SecondaryButton', () => (
    <div>
      <Section title="Sizes">
        <div className={styles.spacingAround}>
          <SecondaryButton size="tiny">Tiny</SecondaryButton>
          <SecondaryButton icon={<IconAdd width={12} height={12} />} size="tiny">Tiny</SecondaryButton>
          <SecondaryButton
            icon={<IconAdd width={12} height={12} />}
            iconAlignment="end"
            size="tiny"
          >
            Tiny
          </SecondaryButton>
        </div>

        <div className={styles.spacingAround}>
          <SecondaryButton>Default</SecondaryButton>
          <SecondaryButton
            icon={<IconAdd width={12} height={12} />}
          >
            Default
          </SecondaryButton>
          <SecondaryButton
            icon={<IconAdd width={12} height={12} />}
            iconAlignment="end"
          >
            Default
          </SecondaryButton>
        </div>

        <div className={styles.spacingAround}>
          <SecondaryButton size="huge">Huge</SecondaryButton>
          <SecondaryButton size="huge" icon={<IconAdd width={12} height={12} />}>Huge</SecondaryButton>
          <SecondaryButton
            size="huge"
            icon={<IconAdd width={12} height={12} />}
            iconAlignment="end"
          >
            Huge
          </SecondaryButton>
        </div>
      </Section>

      <Section title="Normal Relevance">
        <div className={styles.spacingAround}>
          <SecondaryButton>Flat</SecondaryButton>
          <SecondaryButton
            icon={<IconAdd width={12} height={12} />}
          >
            Flat
          </SecondaryButton>
          <SecondaryButton
            icon={<IconAdd width={12} height={12} />}
            iconAlignment="end"
          >
            Flat
          </SecondaryButton>
        </div>
      </Section>

      <Section title="Disabled">
        <div className={styles.spacingAround}>
          <SecondaryButton disabled>Flat</SecondaryButton>
          <SecondaryButton
            disabled
            icon={<IconAdd width={12} height={12} />}
            iconAlignment="end"
          >
            Flat
          </SecondaryButton>
        </div>
      </Section>

      <Section title="Loadings">
        <div className={styles.spacingAround}>
          <SecondaryButton loading>default</SecondaryButton>
          <SecondaryButton
            disabled
            loading
          >
            disabled
          </SecondaryButton>
          <SecondaryButton
            disabled
            displayChildrenWhenLoading
            loading
          >
            Disabled and Loading
          </SecondaryButton>
        </div>
      </Section>
    </div>
  ))
