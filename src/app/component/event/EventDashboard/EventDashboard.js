import React, { Component } from 'react'
import { Button, Col, Row } from 'antd'
import EventList from './EventList'
import { handleFetchEvent } from '../../../../action/eventAction'
import { connect } from 'react-redux'

class EventDashboard extends Component {

  componentDidMount() {
    if (this.props.events === null || Object.keys(this.props.events).length > 0) {
      this.props.handleFetchEvent()
    }
  }

  render() {
    const events = this.props.events
    return (
      <Row type='flex' className='row'>
        <Col xs={16}>
          {
            events &&
            <EventList events={events}/>
          }
        </Col>
        <Col xs={8}>
          side bar
          <Button htmlType='button'>create event</Button>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state) => {
  let events = null
  if (state.events.length > 0) {
    events = state.events
  }
  return {
    events,
  }
}

const mapDispatchToProps = ({
  handleFetchEvent,
})

export default connect(mapStateToProps, mapDispatchToProps)(EventDashboard)