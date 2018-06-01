Image Example

```jsx
const IconUser = require('emblematic-icons/svg/User32.svg').default;

<div style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around'
}}>
  <Image
    alt="Pagar.me"
    source="https://pagar.me/wp-content/uploads/2018/04/logo_pagarme.svg"
    fallback={<span>the image can't be loaded</span>}
    width={200}
  />

  <Image
    alt="Pagar.me"
    source="invalid/path/to/image"
    fallback={<span>the image can't be loaded</span>}
  />

  <Image
    alt="Pagar.me"
    source="invalid/path/to/image"
    fallback={<IconUser />}
  />
</div>
```
