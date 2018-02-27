Card example
```jsx
const Icon = require('emblematic-icons/svg/Calendar32.svg').default;

<Card>
  <CardGraphic>
    <img
      src="https://maxicharts.com/wp-content/uploads/2017/07/banner-1544x500.png"
      alt="placeholder"
    />
  </CardGraphic>
  <CardTitle
    title="Lorem ipsum dolor sit amet"
    icon={<Icon width={16} height={16} />}
  />
  <CardContent>
    <p>Lorem ipsum dolor sit amet, consectetur</p>

    <CardSection
      title="Lorem ipsum dolor sit amet"
    >
      <CardContent>
        loremIpsum
      </CardContent>
    </CardSection>
  </CardContent>
  <CardActions>
    <Button>Action</Button>
    <Button>Action</Button>
    <Button>Action</Button>
    <Button>Action</Button>
  </CardActions>
</Card>
```
