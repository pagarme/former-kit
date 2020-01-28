#### **Examples** ####

Normal state
```jsx
const style = require('./example/style.css');
const numbers = [0, 1, 2, 3, 4, 5];

<div className={style.progressBars}>
  {numbers.map(number => (
    <LinearProgress
      key={number}
      max={numbers[numbers.length - 1]}
      value={number}
    />
  ))}
</div>
```

Normal state without percentage
```jsx
const style = require('./example/style.css');
const numbers = [0, 1, 2, 3, 4, 5];

<div className={style.progressBars}>
  {numbers.map(number => (
    <LinearProgress
      key={number}
      max={numbers[numbers.length - 1]}
      percent={false}
      value={number}
    />
  ))}
</div>
```

Normal state without label
```jsx
const style = require('./example/style.css');
const numbers = [0, 1, 2, 3, 4, 5];

<div className={style.progressBars}>
  {numbers.map(number => (
    <LinearProgress
      label={false}
      key={number}
      max={numbers[numbers.length - 1]}
      value={number}
    />
  ))}
</div>
```

Disabled state
```jsx
const style = require('./example/style.css');
const numbers = [0, 1, 2, 3, 4, 5];


<div className={style.progressBars}>
  {numbers.map(number => (
    <LinearProgress
      disabled
      key={number}
      max={numbers[numbers.length - 1]}
      value={number}
    />
  ))}
</div>
```

Disabled state without percentage
```jsx
const style = require('./example/style.css');
const numbers = [0, 1, 2, 3, 4, 5];

<div className={style.progressBars}>
  {numbers.map(number => (
    <LinearProgress
      disabled
      key={number}
      max={numbers[numbers.length - 1]}
      percent={false}
      value={number}
    />
  ))}
</div>
```

Disabled state without label
```jsx
const style = require('./example/style.css');
const numbers = [0, 1, 2, 3, 4, 5];

<div className={style.progressBars}>
  {numbers.map(number => (
    <LinearProgress
      disabled
      label={false}
      key={number}
      max={numbers[numbers.length - 1]}
      value={number}
    />
  ))}
</div>
```
