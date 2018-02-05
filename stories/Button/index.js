import React from 'react'

import IconAdd from 'emblematic-icons/svg/Add24.svg'

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
        <Button icon={<IconAdd width={12} height={12} />} />
        <Button icon={<IconAdd width={12} height={12} />} >Call to Action</Button>
        <Button
          icon={<IconAdd width={12} height={12} />}
          relevance="high"
        >
          Call to Action
        </Button>
        <Button
          icon={<IconAdd width={12} height={12} />}
          relevance="low"
        >
          Call to Action
        </Button>
      </div>

      <div className={styles.spacingAround}>
        <Button
          icon={<IconAdd width={12} height={12} />}
          fill="gradient"
        />
        <Button
          icon={<IconAdd width={12} height={12} />}
          fill="gradient"
        >
          Call to Action
        </Button>
        <Button
          icon={<IconAdd width={12} height={12} />}
          relevance="high"
          fill="gradient"
        >
          Call to Action
        </Button>
      </div>

      <div className={styles.spacingAround}>
        <Button
          icon={<IconAdd width={12} height={12} />}
          fill="outline"
        />
        <Button
          icon={<IconAdd width={12} height={12} />}
          fill="outline"
        >
          Call to Action
        </Button>
        <Button
          icon={<IconAdd width={12} height={12} />}
          relevance="high"
          fill="outline"
        >
          Call to Action
        </Button>
        <Button
          icon={<IconAdd width={12} height={12} />}
          relevance="low"
          fill="outline"
        >
          Call to Action
        </Button>
      </div>

      <div className={styles.spacingAround}>
        <Button
          icon={<IconAdd width={12} height={12} />}
          fill="clean"
        />
        <Button
          icon={<IconAdd width={12} height={12} />}
          fill="clean"
        >
          Call to Action
        </Button>
        <Button
          icon={<IconAdd width={12} height={12} />}
          relevance="high"
          fill="clean"
        >
          Call to Action
        </Button>
        <Button
          icon={<IconAdd width={12} height={12} />}
          relevance="low"
          fill="clean"
        >
          Call to Action
        </Button>
      </div>


      <h2>Sizes</h2>

      <div className={styles.spacingAround}>
        <Button size="tiny">tiny</Button>
        <Button icon={<IconAdd width={12} height={12} />} size="tiny" />
      </div>

      <div className={styles.spacingAround}>
        <Button size="small">small</Button>
        <Button icon={<IconAdd width={12} height={12} />} size="small" />
      </div>

      <div className={styles.spacingAround}>
        <Button>default</Button>
        <Button icon={<IconAdd width={12} height={12} />} size="default" />
      </div>

      <div className={styles.spacingAround}>
        <Button size="large">large</Button>
        <Button icon={<IconAdd width={12} height={12} />} size="large" />
      </div>

      <h2>All disabled</h2>

      <div className={styles.spacingAround}>
        <Button icon={<IconAdd width={12} height={12} />} disabled />
        <Button icon={<IconAdd width={12} height={12} />} disabled>Call to Action</Button>
        <Button
          icon={<IconAdd width={12} height={12} />}
          relevance="high"
          disabled
        >
          Call to Action
        </Button>
        <Button
          icon={<IconAdd width={12} height={12} />}
          relevance="low"
          disabled
        >
          Call to Action
        </Button>
      </div>

      <div className={styles.spacingAround}>
        <Button
          icon={<IconAdd width={12} height={12} />}
          fill="gradient"
          disabled
        />
        <Button
          icon={<IconAdd width={12} height={12} />}
          fill="gradient"
          disabled
        >
          Call to Action
        </Button>
        <Button
          icon={<IconAdd width={12} height={12} />}
          relevance="high"
          fill="gradient"
          disabled
        >
          Call to Action
        </Button>
      </div>

      <div className={styles.spacingAround}>
        <Button
          icon={<IconAdd width={12} height={12} />}
          fill="outline"
          disabled
        />
        <Button
          icon={<IconAdd width={12} height={12} />}
          fill="outline"
          disabled
        >
          Call to Action
        </Button>
        <Button
          icon={<IconAdd width={12} height={12} />}
          relevance="high"
          fill="outline"
          disabled
        >
          Call to Action
        </Button>
        <Button
          icon={<IconAdd width={12} height={12} />}
          relevance="low"
          fill="outline"
          disabled
        >
          Call to Action
        </Button>
      </div>

      <div className={styles.spacingAround}>
        <Button
          icon={<IconAdd width={12} height={12} />}
          fill="clean"
          disabled
        />
        <Button
          icon={<IconAdd width={12} height={12} />}
          fill="clean"
          disabled
        >
          Call to Action
        </Button>
        <Button
          icon={<IconAdd width={12} height={12} />}
          relevance="high"
          fill="clean"
          disabled
        >
          Call to Action
        </Button>
        <Button
          icon={<IconAdd width={12} height={12} />}
          relevance="low"
          fill="clean"
          disabled
        >
          Call to Action
        </Button>
      </div>
    </div>
  ))
