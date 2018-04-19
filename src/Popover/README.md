#### **Example** ####

``` jsx
const { Fragment } = require('react');
const Button = require('../Button').default;

const items = [
  {
    title: 'My Account',
    action: () => undefined,
  },
  {
    title: 'Logout',
    action: () => undefined,
  }
];

<div style={{ display: 'flex', justifyContent: 'space-around' }}>
  <Popover
    content={
      <Fragment>
        <div>
          <strong>teste@email.com</strong>
          <small>Administrador</small>
        </div>
        <PopoverMenu items={items} />
      </Fragment>
    }
  >
    <Button>Click Me</Button>
  </Popover>

  <Popover
    content={
      <Fragment>
        <div>
          <strong>teste@email.com</strong>
          <small>Administrador</small>
        </div>
        <PopoverMenu items={items} />
      </Fragment>
    }
    base="dark"
  >
    <Button>Click Me</Button>
  </Popover>
</div>
```
