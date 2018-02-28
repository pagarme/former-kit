Layout example

``` jsx static
const SidebarExample = require('./SidebarState')
const {
  Header,
  HeaderTitle,
} = require('../../Header')
const HeaderContentExample = require('./HeaderContentExample')
const FooterExample = require('./FooterExample')

const {
  Grid,
  Row,
  Col,
} = require('../../Grid')

const {
  Card,
  CardTitle,
  CardContent,
} = require('../../Card')

const HeaderExample = () => (
  <Header>
    <HeaderTitle>Transactions</HeaderTitle>
    <HeaderContentExample />
  </Header>
)

const CardExample = () => (
  <Card>
    <CardTitle
      title="Lorem ipsum dolor sit amet"
    />
    <CardContent>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
      venenatis placerat lacus et pretium. Aenean porttitor mi odio, vel
      blandit nulla malesuada et. Duis a tellus quis est iaculis accumsan.
      In diam est, egestas eu lobortis eu, laoreet ut tortor. Sed mattis
      sapien vel malesuada sodales. Curabitur hendrerit purus sed ex
      feugiat hendrerit. Vivamus eleifend odio a congue consectetur.
    </CardContent>
  </Card>
)

const LayoutExample = ({
  sidebar = null,
  header = null,
  footer = null,
}) => (
  <div style={{ height: 'calc(100vh - 16px)', backgroundColor: '#f9f9f9' }}>
    <Layout
      sidebar={sidebar}
      header={header}
      footer={footer}
    >
      <Grid>
        <Row flex>
          <Col tablet={12} palm={12}><CardExample /></Col>
          <Col tablet={12} palm={12}><CardExample /></Col>
        </Row>
        <Row>
          <Col tablet={12} palm={12}><CardExample /></Col>
        </Row>
        <Row flex>
          <Col tablet={12} palm={12}><CardExample /></Col>
          <Col tablet={12} palm={12}><CardExample /></Col>
          <Col tablet={12} palm={12}><CardExample /></Col>
        </Row>
        <Row flex>
          <Col tablet={12} palm={12}><CardExample /></Col>
          <Col tablet={12} palm={12}><CardExample /></Col>
          <Col tablet={12} palm={12}><CardExample /></Col>
          <Col tablet={12} palm={12}><CardExample /></Col>
        </Row>
        <Row flex>
          <Col tablet={12} palm={12}><CardExample /></Col>
          <Col tablet={12} palm={12}><CardExample /></Col>
        </Row>
      </Grid>
    </Layout>
  </div>
)

export default LayoutExample
```

#### **Examples** ####

With Sidebar, Header and Footer
``` jsx
const LayoutExample = require('./examples/Layout').default;
const SidebarExample = require('./examples/SidebarState').default;
const HeaderExample = require('./examples/HeaderContentExample').default;
const FooterExample = require('./examples/FooterExample').default;

<LayoutExample
  sidebar={<SidebarExample />}
  header={<HeaderExample />}
  footer={<FooterExample />}
/>
```

Without Sidebar
``` jsx
const LayoutExample = require('./examples/Layout').default;
const HeaderExample = require('./examples/HeaderContentExample').default;
const FooterExample = require('./examples/FooterExample').default;

<LayoutExample
  header={<HeaderExample />}
  footer={<FooterExample />}
/>
```

Without Header
``` jsx
const LayoutExample = require('./examples/Layout').default;
const SidebarExample = require('./examples/SidebarState').default;
const FooterExample = require('./examples/FooterExample').default;

<LayoutExample
  sidebar={<SidebarExample />}
  footer={<FooterExample />}
/>
```

Without Footer
``` jsx
const LayoutExample = require('./examples/Layout').default;
const SidebarExample = require('./examples/SidebarState').default;
const HeaderExample = require('./examples/HeaderContentExample').default;

<LayoutExample
  sidebar={<SidebarExample />}
  header={<HeaderExample />}
/>
```

With only Sidebar
``` jsx
const LayoutExample = require('./examples/Layout').default;
const SidebarExample = require('./examples/SidebarState').default;

<LayoutExample
  sidebar={<SidebarExample />}
/>
```

With only Header
``` jsx
const LayoutExample = require('./examples/Layout').default;
const HeaderExample = require('./examples/HeaderContentExample').default;

<LayoutExample
  header={<HeaderExample />}
/>
```

With only Footer
``` jsx
const LayoutExample = require('./examples/Layout').default;
const FooterExample = require('./examples/FooterExample').default;

<LayoutExample
  footer={<FooterExample />}
/>
```
