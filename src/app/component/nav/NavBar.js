import React, { Component } from 'react'
import { Avatar, Button, Col, Row } from 'antd'

class NavBar extends Component {
  render() {
    return (
      <Row style={{padding: '2rem', backgroundColor:'#f0f0f0'}} color='primary' align='middle' >
        <Col xs={6}>
          <Avatar src='/assets/images/user.png' />
        </Col>
        <Col>
          <Button htmlType={'button'} >login in </Button>
          <Button htmlType={'button'} >sign up </Button>
        </Col>
      </Row>
    )
  }
}

export default NavBar