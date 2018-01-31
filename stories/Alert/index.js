import React from 'react'
import { storiesOf } from '@storybook/react'
import IconCheck from 'react-icons/lib/md/check'
import IconInfo from 'react-icons/lib/md/info-outline'
import IconWarning from 'react-icons/lib/md/warning'
import IconClear from 'react-icons/lib/md/clear'
import Alert from '../../src/Alert'


storiesOf('Alerts', module)
  .add('All types', () => (
    <div>
      <p>Warning</p>
      <Alert
        type="warning"
        icon={<IconWarning size={16} />}
      >
        <p><strong>Warning</strong> something is going on!</p>
      </Alert>
      <p>Info</p>
      <Alert
        type="info"
        icon={<IconInfo size={16} />}
      >
        <p><strong>Info</strong> you can do it better!</p>
      </Alert>
      <p>Error</p>
      <Alert
        type="error"
        icon={<IconClear size={16} />}
      >
        <p><strong>Error</strong> something went wrong!</p>
      </Alert>
      <p>Success</p>
      <Alert
        type="success"
        icon={<IconCheck size={16} />}
      >
        <p><strong>Success</strong> awesome, it worked!</p>
      </Alert>
    </div>
  ))

