import React, { Component } from 'react'
import { Card, Row } from 'antd'
import EventListItem from './EventListItem'

class EventList extends Component {
  render() {
    const events = this.props.events
    return (
      <Row className='mg__bt--sm'>
        {
          events.map((event) => {
            return <EventListItem key={event.id} id={event.id} event={event}/>
          })
        }
      </Row>
    )
  }
}

export default EventList