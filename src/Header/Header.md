Header example
```jsx
const { Fragment } = require('react');
const IconMessage = require('emblematic-icons/svg/Support24.svg').default;
const IconAlert = require('emblematic-icons/svg/Alert24.svg').default;

<div style={{ backgroundColor: '#808080', padding: '20px' }}>
  <Header>
    <HeaderBackButton
      onClick={() => null}
    />
    <HeaderTitle>Transactions</HeaderTitle>

    <HeaderContent>
      <HeaderLink onClick={() => null}>
        <IconAlert />
      </HeaderLink>
      <HeaderLink
        onClick={() => null}
        icon={<IconMessage />}
      />
      <HeaderMenu
        onClick={() => null}
        title={
          <Fragment>
            <Avatar alt="alt text" photo="https://i.imgur.com/2vp5kTT.jpg" />
            <span>Current username</span>
          </Fragment>
        }
      >
        <Avatar photo="https://i.imgur.com/2vp5kTT.jpg" />
        <span>Nome da Pessoa</span>
      </HeaderMenu>
    </HeaderContent>
  </Header>
</div>
```
