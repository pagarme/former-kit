import React from 'react'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'

import IconCheck from 'emblematic-icons/svg/Check32.svg'
import IconClear from 'emblematic-icons/svg/ClearClose32.svg'
import IconInfo from 'emblematic-icons/svg/Info32.svg'
import IconWarning from 'emblematic-icons/svg/Warning32.svg'

import Alert from '../../src/Alert'
import AlertReadme from '../../src/Alert/index.md'
import Section from '../Section'

storiesOf('Alerts', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: AlertReadme,
    },
  })
  .add('Default', () => (
    <div>
      <Section title="Warning">
        <Alert
          icon={<IconWarning height={16} width={16} />}
          type="warning"
        >
          <p><strong>Warning.</strong> Something is going on!</p>
        </Alert>
      </Section>

      <Section title="Info">
        <Alert
          icon={<IconInfo height={16} width={16} />}
          type="info"
        >
          <p><strong>Info.</strong> You can do it better!</p>
        </Alert>
      </Section>

      <Section title="Error">
        <Alert
          icon={<IconClear height={16} width={16} />}
          type="error"
        >
          <p><strong>Error.</strong> Something went wrong!</p>
        </Alert>
      </Section>

      <Section title="Success">
        <Alert
          icon={<IconCheck height={16} width={16} />}
          type="success"
        >
          <p><strong>Success.</strong> Awesome, it worked!</p>
        </Alert>
      </Section>

      <Section title="Event">
        <Alert
          action="dismiss"
          icon={<IconWarning height={16} width={16} />}
          onDismiss={action('dismiss')}
          type="warning"
        >
          <p><strong>Warning.</strong> Something is going on!</p>
        </Alert>
      </Section>

      <Section title="Warning" base="dark">
        <Alert
          base="dark"
          icon={<IconWarning height={16} width={16} />}
          type="warning"
        >
          <p><strong>Warning.</strong> Something is going on!</p>
        </Alert>
      </Section>

      <Section title="Info" base="dark">
        <Alert
          base="dark"
          icon={<IconInfo height={16} width={16} />}
          type="info"
        >
          <p><strong>Info.</strong> You can do it better!</p>
        </Alert>
      </Section>

      <Section title="Error" base="dark">
        <Alert
          base="dark"
          icon={<IconClear height={16} width={16} />}
          type="error"
        >
          <p><strong>Error.</strong> Something went wrong!</p>
        </Alert>
      </Section>

      <Section title="Success" base="dark">
        <Alert
          base="dark"
          icon={<IconCheck height={16} width={16} />}
          type="success"
        >
          <p><strong>Success.</strong> Awesome, it worked!</p>
        </Alert>
      </Section>

      <Section title="Event" base="dark">
        <Alert
          action="dismiss"
          base="dark"
          icon={<IconWarning height={16} width={16} />}
          onDismiss={action('dismiss')}
          type="warning"
        >
          <p><strong>Warning.</strong> Something is going on!</p>
        </Alert>
      </Section>
    </div>
  ))
