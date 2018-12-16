import React, { Component } from 'react'
import { Button, Col, Row } from 'antd'

class EventDashboard extends Component {
  render() {
    return (
      <Row type='flex' className='row'>
        <Col xs={6}>
        EventDashboard
        <Button htmlType='button' type='primary' >click to check </Button>

        </Col>
        <Col>
          side bar
        </Col>

      </Row>
    )
  }
}

export default EventDashboard