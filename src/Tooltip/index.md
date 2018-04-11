#### **Examples** ####

```jsx static
import React from 'react'
import PropTypes from 'prop-types'
import { ToolTip, Button } from 'former-kit'

const lorem = `
Lorem ipsum dolor sit amet consectetur adipisicing elit.
Deleniti officia ipsam consectetur laudantium eius asperiores ut
maiores corporis.
`

const Tooltip = ({ placement, text }) => (
  <ToolTip
    placement={placement}
    content={lorem}
  >
    <Button>{ text }</Button>
  </ToolTip>
)

Tooltip.propTypes = {
  placement: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default Tooltip
```

```jsx
const Tooltip = require('./example').default;
const { Grid, Row, Col } = require('../Grid');
const style = require('./example/style.css');

<Grid>
  <Row>
    <Col palm={12} tablet={4} desk={4} tv={4} className={style.col}>
      <Tooltip placement="rightStart" text="Right start" />
      <Tooltip placement="rightMiddle" text="Right middle" />
      <Tooltip placement="rightEnd" text="Right end" />
      <Tooltip placement="topStart" text="Top start" />
    </Col>

    <Col palm={12} tablet={4} desk={4} tv={4} className={style.col}>
      <Tooltip placement="bottomStart" text="Bottom start" />
      <Tooltip placement="bottomCenter" text="Bottom center" />
      <Tooltip placement="bottomEnd" text="Bottom end" />
      <Tooltip placement="topCenter" text="Top center" />
    </Col>

    <Col palm={12} tablet={4} desk={4} tv={4} className={style.col}>
      <Tooltip placement="leftStart" text="Left start" />
      <Tooltip placement="leftMiddle" text="Left middle" />
      <Tooltip placement="leftEnd" text="Left end" />
      <Tooltip placement="topEnd" text="Top end" />
    </Col>
  </Row>
</Grid>
```
