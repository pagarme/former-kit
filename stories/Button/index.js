import React from 'react'

import IconAdd from 'emblematic-icons/svg/Add24.svg'

import { storiesOf } from '@storybook/react'

import Section from '../Section'
import Button from '../../src/Button'
import ButtonLoading from './ButtonLoading'

import styles from './style.css'

storiesOf('Buttons', module)
  .add('Default', () => (
    <div>
      <Section title="Sizes">
        <div className={styles.spacingAround}>
          <Button size="tiny">Tiny</Button>
          <Button icon={<IconAdd width={12} height={12} />} size="tiny">Tiny</Button>
          <Button
            icon={<IconAdd width={12} height={12} />}
            iconAlignment="end"
            size="tiny"
          >
            Tiny
          </Button>
        </div>

        <div className={styles.spacingAround}>
          <Button>Default</Button>
          <Button icon={<IconAdd width={12} height={12} />} >Default</Button>
          <Button
            icon={<IconAdd width={12} height={12} />}
            iconAlignment="end"
          >
            Default
          </Button>
        </div>

        <div className={styles.spacingAround}>
          <Button size="huge">Huge</Button>
          <Button size="huge" icon={<IconAdd width={12} height={12} />}>Huge</Button>
          <Button
            size="huge"
            icon={<IconAdd width={12} height={12} />}
            iconAlignment="end"
          >
            Huge
          </Button>
        </div>
      </Section>

      <Section title="Normal Relevance">
        <div className={styles.spacingAround}>
          <Button>Flat</Button>
          <Button icon={<IconAdd width={12} height={12} />}>Flat</Button>
          <Button
            icon={<IconAdd width={12} height={12} />}
            iconAlignment="end"
          >
            Flat
          </Button>
        </div>

        <div className={styles.spacingAround}>
          <Button fill="gradient">Gradient</Button>
          <Button fill="gradient" icon={<IconAdd width={12} height={12} />}>Gradient</Button>
          <Button
            fill="gradient"
            icon={<IconAdd width={12} height={12} />}
            iconAlignment="end"
          >
            Gradient
          </Button>
        </div>

        <div className={styles.spacingAround}>
          <Button fill="outline">Outline</Button>
          <Button fill="outline" icon={<IconAdd width={12} height={12} />}>Outline</Button>
          <Button
            fill="outline"
            icon={<IconAdd width={12} height={12} />}
            iconAlignment="end"
          >
            Outline
          </Button>
        </div>

        <div className={styles.spacingAround}>
          <Button fill="clean">Clean</Button>
          <Button fill="clean" icon={<IconAdd width={12} height={12} />}>Clean</Button>
          <Button
            fill="clean"
            icon={<IconAdd width={12} height={12} />}
            iconAlignment="end"
          >
            Clean
          </Button>
        </div>

      </Section>

      <Section title="High Relevance">
        <div className={styles.spacingAround}>
          <Button relevance="high">Flat</Button>
          <Button relevance="high" icon={<IconAdd width={12} height={12} />}>Flat</Button>
          <Button
            relevance="high"
            icon={<IconAdd width={12} height={12} />}
            iconAlignment="end"
          >
            Flat
          </Button>
        </div>

        <div className={styles.spacingAround}>
          <Button relevance="high" fill="gradient">Gradient</Button>
          <Button
            relevance="high"
            fill="gradient"
            icon={<IconAdd width={12} height={12} />}
          >
            Gradient
          </Button>
          <Button
            relevance="high"
            fill="gradient"
            icon={<IconAdd width={12} height={12} />}
            iconAlignment="end"
          >
            Gradient
          </Button>
        </div>

        <div className={styles.spacingAround}>
          <Button relevance="high" fill="outline">Outline</Button>
          <Button
            relevance="high"
            fill="outline"
            icon={<IconAdd width={12} height={12} />}
          >
            Outline
          </Button>
          <Button
            relevance="high"
            fill="outline"
            icon={<IconAdd width={12} height={12} />}
            iconAlignment="end"
          >
            Outline
          </Button>
        </div>

        <div className={styles.spacingAround}>
          <Button relevance="high" fill="clean">Clean</Button>
          <Button
            relevance="high"
            fill="clean"
            icon={<IconAdd width={12} height={12} />}
          >
            Clean
          </Button>
          <Button
            relevance="high"
            fill="clean"
            icon={<IconAdd width={12} height={12} />}
            iconAlignment="end"
          >
            Clean
          </Button>
        </div>
      </Section>

      <Section title="Low Relevance">
        <div className={styles.spacingAround}>
          <Button relevance="low">Flat</Button>
          <Button relevance="low" icon={<IconAdd width={12} height={12} />}>Flat</Button>
          <Button
            relevance="low"
            icon={<IconAdd width={12} height={12} />}
            iconAlignment="end"
          >
            Flat
          </Button>
        </div>

        <div className={styles.spacingAround}>
          <Button relevance="low" fill="gradient">Gradient</Button>
          <Button
            relevance="low"
            fill="gradient"
            icon={<IconAdd width={12} height={12} />}
          >
            Gradient
          </Button>
          <Button
            relevance="low"
            fill="gradient"
            icon={<IconAdd width={12} height={12} />}
            iconAlignment="end"
          >
            Gradient
          </Button>
        </div>

        <div className={styles.spacingAround}>
          <Button relevance="low" fill="outline">Outline</Button>
          <Button
            relevance="low"
            fill="outline"
            icon={<IconAdd width={12} height={12} />}
          >
            Outline
          </Button>
          <Button
            relevance="low"
            fill="outline"
            icon={<IconAdd width={12} height={12} />}
            iconAlignment="end"
          >
            Outline
          </Button>
        </div>

        <div className={styles.spacingAround}>
          <Button relevance="low" fill="clean">Clean</Button>
          <Button
            relevance="low"
            fill="clean"
            icon={<IconAdd width={12} height={12} />}
          >
            Clean
          </Button>
          <Button
            relevance="low"
            fill="clean"
            icon={<IconAdd width={12} height={12} />}
            iconAlignment="end"
          >
            Clean
          </Button>
        </div>
      </Section>

      <Section title="Icon only">
        <div className={styles.spacingAround}>
          <Button icon={<IconAdd width={12} height={12} />} />
          <Button circle icon={<IconAdd width={12} height={12} />} />
        </div>

        <div className={styles.spacingAround}>
          <Button fill="outline" icon={<IconAdd width={12} height={12} />} />
          <Button circle fill="outline" icon={<IconAdd width={12} height={12} />} />
        </div>
      </Section>

      <Section title="Disabled">
        <div className={styles.spacingAround}>
          <Button disabled>Flat</Button>
          <Button
            disabled
            icon={<IconAdd width={12} height={12} />}
            iconAlignment="end"
          >
            Flat
          </Button>
        </div>

        <div className={styles.spacingAround}>
          <Button disabled fill="gradient">Gradient</Button>
          <Button
            disabled
            fill="gradient"
            icon={<IconAdd width={12} height={12} />}
          >
            Gradient
          </Button>
          <Button
            disabled
            fill="gradient"
            icon={<IconAdd width={12} height={12} />}
            iconAlignment="end"
          >
            Gradient
          </Button>
        </div>

        <div className={styles.spacingAround}>
          <Button disabled fill="outline">Outline</Button>
          <Button disabled fill="outline" icon={<IconAdd width={12} height={12} />}>Outline</Button>
          <Button
            disabled
            fill="outline"
            icon={<IconAdd width={12} height={12} />}
            iconAlignment="end"
          >
            Outline
          </Button>
        </div>

        <div className={styles.spacingAround}>
          <Button disabled fill="clean">Clean</Button>
          <Button disabled fill="clean" icon={<IconAdd width={12} height={12} />}>Clean</Button>
          <Button
            disabled
            fill="clean"
            icon={<IconAdd width={12} height={12} />}
            iconAlignment="end"
          >
            Clean
          </Button>
        </div>

        <div className={styles.spacingAround}>
          <Button disabled icon={<IconAdd width={12} height={12} />} />
          <Button disabled circle icon={<IconAdd width={12} height={12} />} />
        </div>

        <div className={styles.spacingAround}>
          <Button disabled fill="outline" icon={<IconAdd width={12} height={12} />} />
          <Button disabled circle fill="outline" icon={<IconAdd width={12} height={12} />} />
        </div>
      </Section>

      <Section title="Loadings">
        <div className={styles.spacingAround}>
          <ButtonLoading>default</ButtonLoading>
          <ButtonLoading size="huge" fill="outline">outline</ButtonLoading>
          <ButtonLoading icon={<IconAdd width={12} height={12} />} />
          <ButtonLoading
            icon={<IconAdd width={12} height={12} />}
            relevance="low"
            size="tiny"
          >
            tiny
          </ButtonLoading>
          <ButtonLoading
            displayChildrenWhenLoading
            icon={<IconAdd width={12} height={12} />}
            iconAlignment="end"
            relevance="high"
          >
            High
          </ButtonLoading>
          <ButtonLoading
            displayChildrenWhenLoading
            icon={<IconAdd width={18} height={18} />}
            relevance="high"
            size="huge"
          >
            High
          </ButtonLoading>
          <ButtonLoading
            disabled
            displayChildrenWhenLoading
            loading
          >
            outline
          </ButtonLoading>
        </div>
      </Section>
    </div>
  ))
