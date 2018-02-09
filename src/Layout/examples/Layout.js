import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../index'

import {
  Grid,
  Row,
  Col,
} from '../../Grid'

import {
  Card,
  CardTitle,
  CardContent,
} from '../../Card'

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

LayoutExample.propTypes = {
  sidebar: PropTypes.element,
  header: PropTypes.element,
  footer: PropTypes.element,
}

LayoutExample.defaultProps = {
  sidebar: null,
  header: null,
  footer: null,
}

export default LayoutExample
