import React from 'react'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import IconClose from 'emblematic-icons/svg/ClearClose24.svg'

import Snackbar from '../../src/Snackbar'
import SnackbarWithState from './SnackbarWithState'
import Section from '../Section'

storiesOf('Snackbar', module)
  .add('Default', () => (
    <div>
      <Section title="Error">
        <Snackbar
          type="error"
        >
          <p>Something went wrong!</p>
        </Snackbar>
      </Section>
      <br />
      <Section title="Info">
        <Snackbar
          type="info"
        >
          <p>Settings saved successfully</p>
        </Snackbar>
      </Section>
      <br />
      <Section title="Success">
        <Snackbar
          type="success"
        >
          <p><strong>Hurray!</strong> Your settings were saved successfully!</p>
        </Snackbar>
      </Section>
      <br />
      <Section title="Warning">
        <Snackbar
          type="warning"
        >
          <p><strong>Warning!</strong> Something went wrong...</p>
        </Snackbar>
      </Section>
      <br />
      <Section title="Event">
        <Snackbar
          action=""
          icon={<IconClose height={12} width={12} />}
          onDismiss={action('dismiss')}
          type="info"
        >
          <p>Settings saved successfully</p>
        </Snackbar>
      </Section>
      <br />
      <Section title="With State">
        <SnackbarWithState />
      </Section>
      <Section title="With TimeOut">
        <SnackbarWithState
          dismissTimeOutExample
        />
      </Section>
    </div>
  ))
