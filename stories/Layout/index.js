import React from 'react'
import { storiesOf } from '@storybook/react'

import Layout from '../../src/Layout'
import SidebarExample from '../Sidebar/SidebarState'
import {
  Header,
  HeaderTitle,
} from '../../src/Header'
import HeaderContentExample from '../Header/HeaderContentExample'
import FooterExample from '../Footer/FooterExample'

import {
  Grid,
  Row,
  Col,
} from '../../src/Grid'

import {
  Card,
  CardTitle,
  CardContent,
} from '../../src/Card'

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

storiesOf('Layout', module)
  .add('defaultTheme with all props', () => (
    <LayoutExample
      sidebar={<SidebarExample />}
      header={<HeaderExample />}
      footer={<FooterExample />}
    />
  ))
  .add('defaultTheme without Sidebar', () => (
    <LayoutExample
      header={<HeaderExample />}
      footer={<FooterExample />}
    />
  ))
  .add('defaultTheme without Header', () => (
    <LayoutExample
      sidebar={<SidebarExample />}
      footer={<FooterExample />}
    />
  ))
  .add('defaultTheme without Footer', () => (
    <LayoutExample
      sidebar={<SidebarExample />}
      header={<HeaderExample />}
    />
  ))
  .add('defaultTheme only Sidebar', () => (
    <LayoutExample
      sidebar={<SidebarExample />}
    />
  ))
  .add('defaultTheme only Header', () => (
    <LayoutExample
      header={<HeaderExample />}
    />
  ))
  .add('defaultTheme only Footer', () => (
    <LayoutExample
      footer={<FooterExample />}
    />
  ))
