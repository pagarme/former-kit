import React from 'react'
import { storiesOf } from '@storybook/react'
import IconCheck from 'emblematic-icons/svg/Check32.svg'
import IconInfo from 'emblematic-icons/svg/Info32.svg'
import IconWarning from 'emblematic-icons/svg/Warning32.svg'
import IconClear from 'emblematic-icons/svg/ClearClose32.svg'
import Section from '../Section'
import Alert from '../../src/Alert'


storiesOf('Alerts', module)
  .add('Default', () => (
    <div>
      <Section title="Warning">
        <Alert
          type="warning"
          icon={<IconWarning height={16} width={16} />}
        >
          <p><strong>Warning</strong> something is going on!</p>
        </Alert>
      </Section>

      <Section title="Info">
        <Alert
          type="info"
          icon={<IconInfo height={16} width={16} />}
        >
          <p><strong>Info</strong> you can do it better!</p>
        </Alert>
      </Section>

      <Section title="Error">
        <Alert
          type="error"
          icon={<IconClear height={16} width={16} />}
        >
          <p><strong>Error</strong> something went wrong!</p>
        </Alert>
      </Section>

      <Section title="Section">
        <Alert
          type="success"
          icon={<IconCheck height={16} width={16} />}
        >
          <p><strong>Success</strong> awesome, it worked!</p>
        </Alert>
      </Section>
    </div>
  ))

