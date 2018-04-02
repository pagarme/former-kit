#### **Examples** ####

The default button looks like this:
```jsx
<Button>Call to action</Button>
```

The button can have different sizes:
```jsx
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
  <Button size="tiny">Call to action</Button>
  <Button size="default">Call to action</Button>
  <Button size="huge">Call to action</Button>
</div>
```

You can add relevance to buttons!
```jsx
<div style={{ display: 'flex', justifyContent: 'space-around' }}>
  <Button relevance="high">Call to Action</Button>
  <Button relevance="normal">Call to Action</Button>
  <Button relevance="low">Call to Action</Button>
</div>
```

You can also "fill" the buttons in different ways:
```jsx
<div style={{ display: 'flex', justifyContent: 'space-around' }}>
  <Button fill="gradient">Call to Action</Button>
  <Button relevance="high" fill="outline">Call to Action</Button>
  <Button relevance="low" fill="clean">Call to Action</Button>
  <Button fill="flat">Call to Action</Button>
</div>
```

And the button can be disabled:
```jsx
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
  <Button disabled fill="gradient">Call to Action</Button>
  <Button disabled relevance="high" fill="outline">Call to Action</Button>
  <Button disabled relevance="low" fill="clean">Call to Action</Button>
  <Button disabled fill="flat">Call to Action</Button>
</div>
```

Finally, the button can have an icon!
```jsx
const IconAdd = require('emblematic-icons/svg/Add24.svg').default;

<div style={{ display: 'flex', justifyContent: 'space-around' }}>
  <Button circle icon={<IconAdd width={12} height={12} />} />
  <Button icon={<IconAdd width={12} height={12} />} />
  <Button icon={<IconAdd width={12} height={12} />} >Call to Action</Button>
</div>
```
