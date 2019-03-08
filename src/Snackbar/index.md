#### **Examples** ####

Warning
```jsx
<Snackbar
  type="warning"
>
  <p><strong>Warning!</strong> Something may not have worked well...</p>
</Snackbar>
```

Info
```jsx
<Snackbar
  type="info"
>
  <p>Settings saved successfully</p>
</Snackbar>
```

Error
```jsx
<Snackbar
  type="error"
>
  <p>Something went wrong!</p>
</Snackbar>
```

Success
```jsx
<Snackbar
  type="success"
>
  <p><strong>Hurray!</strong> Your settings were saved successfully!</p>
</Snackbar>
```

Snackbar With Event
```jsx
const IconClose = require('emblematic-icons/svg/ClearClose24.svg').default;

<Snackbar
  icon={<IconClose height={12} width={12} />}
  onDismiss={null}
  type="info"
>
  <p>Settings saved successfully</p>
</Snackbar>
```
