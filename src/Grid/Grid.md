The Grid is very complete.
First, let's declare a basic component that will be used inside the grid:
```jsx static
const CardSample = ({ size, color, children }) => (
  <Card>
    <CardGraphic>
      <div
        style={{ backgroundColor: color }}
      >
        {size > 0
          ? `${size} column${size > 1 ? 's' : ''}`
          : null
        }
        {children}
      </div>
    </CardGraphic>
  </Card>
)
```

A basic example looks like this:
```jsx
const CardSample = require('./example/CardSample').default;
const { range } = require('ramda');
const maxColumns = 12;

<Grid>
  {range(0, maxColumns).reverse().map(size => (
    <Row key={size}>
      <Col
        tv={maxColumns - size}
        desk={maxColumns - size}
        tablet={maxColumns - size}
        palm={maxColumns - size}
      >
        <CardSample size={maxColumns - size} />
      </Col>
    </Row>
  ))}
</Grid>
```

It can be responsive:
```jsx
const CardSample = require('./example/CardSample').default;
const { range } = require('ramda');

<Grid>
  <Row stretch>
    {range(0, 4).map(i => (
      <Col key={i} desk={3} tv={3} tablet={6} palm={12}>
        <CardSample color="#cc0000" />
      </Col>
    ))}
  </Row>
  <Row stretch>
    <Col desk={12} tv={12} tablet={12} palm={12}>
      <CardSample color="#00cc00" />
    </Col>
  </Row>
  <Row stretch>
    <Col desk={6} tv={6} tablet={6} palm={12}>
      <CardSample color="#0000cc" />
    </Col>
    <Col desk={6} tv={6} tablet={6} palm={12}>
      <CardSample color="#0000cc" />
    </Col>
  </Row>

  <Row stretch>
    <Col desk={6} tv={6} tablet={6} palm={12}>
      <CardSample color="#cccc00" />
    </Col>

    <Col desk={6} tv={6} tablet={6} palm={12}>
      <Row stretch>
        {range(0, 4).map(i => (
          <Col key={i} desk={6} tv={6} tablet={12} palm={12}>
            <CardSample color="#cc00cc" />
          </Col>
        ))}
      </Row>
    </Col>
  </Row>
</Grid>
```

It can be proportional:
```jsx
const CardSample = require('./example/CardSample').default;
const { range } = require('ramda');
const maxColumns = 12;
const equalDistributionExamples = [1, 2, 3, 4, 6, 12];

<Grid>
  {equalDistributionExamples.map(size => (
    <Row key={size}>
      {range(1, size + 1).map(i => (
        <Col
          key={i}
          tv={maxColumns / size}
          desk={maxColumns / size}
          tablet={maxColumns / size}
          palm={maxColumns / size}
        >
          <CardSample size={maxColumns / size} />
        </Col>
      ))}
    </Row>
  ))}
</Grid>
```

And it can be flexible:
```jsx
const CardSample = require('./example/CardSample').default;
const { range } = require('ramda');

const reallyLongString = [
  'Loremipsumdolorsitamet,',
  'consetetursadipscingelitr,',
  'seddiamvoluptua.',
  'Atveroeosetaccusametjustoduodoloresetearebum.',
].join('');

<Grid>
  <Row flex>
    <Col tv={6} desk={8} tablet={10} palm={12}>
      <CardSample>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
        vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
        no sea takimata sanctus est Lorem ipsum dolor sit amet.
      </CardSample>
    </Col>
    <Col>
      <CardSample />
    </Col>
  </Row>
  <Row flex>
    <Col>
      <CardSample>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
        vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
        no sea takimata sanctus est Lorem ipsum dolor sit amet.
      </CardSample>
    </Col>
    <Col>
      <CardSample />
    </Col>
  </Row>
  <Row flex>
    <Col>
      <CardSample>
        {reallyLongString}
      </CardSample>
    </Col>
    <Col>
      <CardSample />
    </Col>
  </Row>
</Grid>
```

A combination of grids:
```jsx
const CardSample = require('./example/CardSample').default;
const { range } = require('ramda');
const maxColumns = 12;
const combinationExamples = range(3, 9);

<Grid>
  {combinationExamples.map(size => (
    <Row key={size}>
      <Col
        tv={size}
        desk={size}
        tablet={size}
        palm={size}
      >
        <CardSample size={size} />
      </Col>
      <Col
        tv={maxColumns - size}
        desk={maxColumns - size}
        tablet={maxColumns - size}
        palm={maxColumns - size}
      >
        <CardSample size={maxColumns - size} />
      </Col>
    </Row>
  ))}
</Grid>
```
