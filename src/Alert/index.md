
#### **Examples** ####

Warning
```jsx
const IconWarning = require('emblematic-icons/svg/Warning32.svg').default;

<Alert
  type="warning"
  icon={<IconWarning height={16} width={16} />}
>
  <p><strong>Warning</strong> something is going on!</p>
</Alert>
```

Info
```jsx
const IconInfo = require('emblematic-icons/svg/Info32.svg').default;

<Alert
  type="info"
  icon={<IconInfo height={16} width={16} />}
>
  <p><strong>Info</strong> you can do it better!</p>
</Alert>
```

Error
```jsx
const IconClear = require('emblematic-icons/svg/ClearClose32.svg').default;

<Alert
  type="error"
  icon={<IconClear height={16} width={16} />}
>
  <p><strong>Error</strong> something went wrong!</p>
</Alert>
```

Success
```jsx
const IconCheck = require('emblematic-icons/svg/Check32.svg').default;

<Alert
  type="success"
  icon={<IconCheck height={16} width={16} />}
>
  <p><strong>Success</strong> awesome, it worked!</p>
</Alert>
```
