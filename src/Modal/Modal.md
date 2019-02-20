#### **Example** ####
Simple Modal
``` jsx
const ModalWithState = require('./examples/ModalWithState').default;
<ModalWithState title="Simple modal title" />
```

Modal with complete title
``` jsx
const ModalWithState = require('./examples/ModalWithState').default;
<ModalWithState
  completeTitle
  message="Modal with complete title"
/>
```

Modal with actions
``` jsx
const ModalWithState = require('./examples/ModalWithState').default;
<ModalWithState
  message="Modal with actions"
  title="Action modal tilte"
  withActions
/>
```

Full features modal
``` jsx
const ModalWithState = require('./examples/ModalWithState').default;
<ModalWithState
  completeTitle
  message="Modal with all features"
  title="Full features modal"
  withActions
  withSection
/>
```
