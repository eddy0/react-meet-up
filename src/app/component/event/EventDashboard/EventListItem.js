import React from 'react'
import EventAttendees from './EventAttendees'
import { Link } from 'react-router-dom'
import { Button, Icon, Item, Label, List, Segment } from 'semantic-ui-react'
import format from 'date-fns/format'

function EventListItem(props) {
  const event = props.event
  let eventDate
  if (event.date) {
    eventDate = (event.date).toDate()
  }
  return (
    <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header as={Link} to={`/event/${event.id}`}>{event.title}</Item.Header>
                <Item.Description>
                  Hosted by <Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link>
                </Item.Description>
                {event.cancelled &&
                <Label style={{top: '-40px'}} ribbon='right' color='red' content='This event has been cancelled'/>}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {eventDate && format(eventDate, 'dddd Do MMMM')} at {eventDate && format(eventDate, 'HH:mm')}|
            <Icon name="marker" /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
          {event.attendees &&
            Object.entries(event.attendees).map(([id, attendee]) => (
              <EventAttendees key={id} attendee={attendee}/>
          ))}
          </List>
        </Segment>
        <Segment clearing>
        <span>{event.description}</span>
          <Button as={Link} to={`/event/${event.id}`} color="teal" floated="right" content="View" />
        </Segment>
      </Segment.Group>
  )
}

export default EventListItem