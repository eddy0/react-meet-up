import React from 'react'
import { Avatar, Button, Card, Divider, Row } from 'antd'
import EventAttendees from './EventAttendees'
import { Link } from 'react-router-dom'


function EventListItem(props) {
  const event = props.event
  return (
    <Card className='mg__bottom--md' style={{boxShadow: '0 5px 15px rgba(0,0,0,0.3)', borderRadius: 5}}>
      <Row>
        <Avatar src={event.hostPhotoURL || 'assets/images/user.png'}/>
        <span>{event.title}</span>
        <span>Hosted by {event.hostedBy}</span>
        <Divider/>
        <Row type='flex'>
          <h5>date</h5>
          <h5>time</h5>
        </Row>
        <Divider/>
        <p>event address</p>
        <Divider/>
        <EventAttendees attendees={event.attendees}/>
        <Divider/>
        <Row type='flex'>
          <p>
            {event.description}
          </p>
          <Link to={`/event/${event.id}`}>
            <Button htmlType='button'>view</Button>
          </Link>
        </Row>
      </Row>
    </Card>
  )
}

export default EventListItem