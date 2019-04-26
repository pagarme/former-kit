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
  footer = null,
  header = null,
  sidebar = null,
}) => (
  <div style={{ backgroundColor: '#f9f9f9', height: 'calc(100vh - 16px)' }}>
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
  footer: PropTypes.element,
  header: PropTypes.element,
  sidebar: PropTypes.element,
}

LayoutExample.defaultProps = {
  footer: null,
  header: null,
  sidebar: null,
}

export default LayoutExample
