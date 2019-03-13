#### **Examples** ####


Warning
```jsx
<div style={{ position: 'relative', height: 36 }}>
  <Snackbar
    type="warning"
  >
    <p><strong>Warning!</strong> Something may not have worked well...</p>
  </Snackbar>
</div>
```

Info
```jsx
<div style={{ position: 'relative', height: 36 }}>
  <Snackbar
    type="info"
  >
    <p>Settings saved successfully</p>
  </Snackbar>
</div>
```

Error
```jsx
<div style={{ position: 'relative', height: 36 }}>
  <Snackbar
    type="error"
  >
    <p>Something went wrong!</p>
  </Snackbar>
</div>
```

Success
```jsx
<div style={{ position: 'relative', height: 36 }}>
  <Snackbar
    type="success"
  >
    <p><strong>Hurray!</strong> Your settings were saved successfully!</p>
  </Snackbar>
</div>
```

Snackbar With Event
```jsx
const IconClose = require('emblematic-icons/svg/ClearClose24.svg').default;

<div style={{ position: 'relative', height: 36 }}>
  <Snackbar
    icon={<IconClose height={12} width={12} />}
    onDismiss={() => console.log('onDismiss')}
    type="info"
  >
    <p>Settings saved successfully</p>
  </Snackbar>
</div>
```
