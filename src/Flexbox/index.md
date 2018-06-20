#### **Examples** ####

flex-start
```jsx
const Button = require('../Button').default;
const Spacing = require('../Spacing').default;

<Flexbox
  alignItems="flex-start"
  justifyContent="flex-start"
>
  <Button>first button</Button>
  <Spacing size="tiny" />
  <Button>secont button</Button>
  <Spacing size="tiny" />
  <Button>third button</Button>
</Flexbox>
```

center
``` jsx
const Button = require('../Button').default;
const Spacing = require('../Spacing').default;

<Flexbox justifyContent="center">
  <Button>first button</Button>
  <Spacing size="tiny" />
  <Button>secont button</Button>
  <Spacing size="tiny" />
  <Button>third button</Button>
</Flexbox>
```

flex-end
``` jsx
const Button = require('../Button').default;
const Spacing = require('../Spacing').default;

<Flexbox justifyContent="flex-end">
  <Button>first button</Button>
  <Spacing size="tiny" />
  <Button>secont button</Button>
  <Spacing size="tiny" />
  <Button>third button</Button>
</Flexbox>
```

space-evenly
``` jsx
const Button = require('../Button').default;
const Spacing = require('../Spacing').default;

<Flexbox justifyContent="space-evenly">
  <Button>first button</Button>
  <Spacing size="tiny" />
  <Button>secont button</Button>
  <Spacing size="tiny" />
  <Button>third button</Button>
</Flexbox>
```


space-around
``` jsx
const Button = require('../Button').default;
const Spacing = require('../Spacing').default;

<Flexbox justifyContent="space-around">
  <Button>first button</Button>
  <Spacing size="tiny" />
  <Button>secont button</Button>
  <Spacing size="tiny" />
  <Button>third button</Button>
</Flexbox>
```

space-between
``` jsx
const Button = require('../Button').default;
const Spacing = require('../Spacing').default;

<Flexbox justifyContent="space-between">
  <Button>first button</Button>
  <Spacing size="tiny" />
  <Button>secont button</Button>
  <Spacing size="tiny" />
  <Button>third button</Button>
</Flexbox>
```

row-reverse
``` jsx
const Button = require('../Button').default;
const Spacing = require('../Spacing').default;

<Flexbox direction="row-reverse">
  <Button>first button</Button>
  <Spacing size="tiny" />
  <Button>secont button</Button>
  <Spacing size="tiny" />
  <Button>third button</Button>
</Flexbox>
```

column
``` jsx
const Button = require('../Button').default;
const Spacing = require('../Spacing').default;

<Flexbox direction="column">
  <Button>first button</Button>
  <br />
  <Button>secont button</Button>
  <br />
  <Button>third button</Button>
</Flexbox>
```

column-reverse
``` jsx
const Button = require('../Button').default;
const Spacing = require('../Spacing').default;

<Flexbox direction="column-reverse">
  <Button>first button</Button>
  <br />
  <Button>secont button</Button>
  <br />
  <Button>third button</Button>
</Flexbox>
```

stretch
```jsx
const Spacing = require('../Spacing').default;

const Square = ({ children }) => (
  <div
    style={{
      backgroundColor: '#37cc9a',
      borderRadius: 4,
      color: '#ffffff',
      display: 'block',
      padding: 8,
    }}
  >
    {children}
  </div>
);

<Flexbox alignItems="stretch">
  <Square>A long text<br /> A long long text</Square>
  <Spacing size="tiny" />
  <Square>A small text.</Square>
  <Spacing size="tiny" />
  <Square>A small text.</Square>
  <Spacing size="tiny" />
  <Square>A small text.</Square>
  <Spacing size="tiny" />
</Flexbox>
```

baseline
```jsx
const Spacing = require('../Spacing').default;

const Square = ({ children }) => (
  <div
    style={{
      backgroundColor: '#37cc9a',
      borderRadius: 4,
      color: '#ffffff',
      display: 'block',
      padding: 8,
    }}
  >
    {children}
  </div>
);

<Flexbox alignItems="baseline">
  <Square>A long text<br /> A long long text</Square>
  <Spacing size="tiny" />
  <Square>A small text.</Square>
  <Spacing size="tiny" />
  <Square>lets <br />break <br />lines.</Square>
  <Spacing size="tiny" />
  <Square>A small text.</Square>
  <Spacing size="tiny" />
</Flexbox>
```
