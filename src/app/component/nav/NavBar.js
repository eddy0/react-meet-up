import React, { Component } from 'react'
import { Avatar, Button, Col, Row, Menu, Layout } from 'antd'

class NavBar extends Component {


  render() {
    return (
      <Layout.Header className='header'>
        <Row type='flex' className='row' justify='middle'>
          <Col className='logo mg__right--sm'>
            <Avatar src='/assets/images/logo.png' alt='logo'/>
            <span>Logo</span>
          </Col>
          <Col style={{flex: 1}}>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['events']}
              >
                <Menu.Item key="events">Events</Menu.Item>
                <Menu.Item key="people">People</Menu.Item>
                <Menu.Item key="create"> Create Event</Menu.Item>
              </Menu>
          </Col>
          <Col>
          <Button htmlType={'button'} type='primary'>login</Button>
          <Button htmlType={'button'} type='danger'>sign up </Button>
          </Col>
        </Row>
      </Layout.Header>
    )
  }
}

export default NavBar