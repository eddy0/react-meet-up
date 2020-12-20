import React from 'react'
import { Button, Icon, Item, List, Segment } from 'semantic-ui-react'
import EventlistAttendee from './EventlistAttendee'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteEvent } from '../eventActions'

function EventListItem({event}) {
  const {id, title, date, category, description, city, venue, hostedBy, hostPhotoURL, attendees,} = event
  const dispatch = useDispatch()
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size={'tiny'} circular src={hostPhotoURL}/>
            <Item.Content>
              <Item.Header content={title}/>
              <Item.Description>
                hosted by {hostedBy}
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name={'clock'}/> {date}
          <Icon name={'marker'}/> {venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {attendees.map((attendee) => {
            return <EventlistAttendee key={attendee.id} attendee={attendee}/>
          })}
        </List>
      </Segment>
      <Segment clearing>
        <div>{description}</div>
        <Button color={'red'} floated={'right'} onClick={() => dispatch(deleteEvent(id))} >Delete</Button>
        <Button color={'teal'} floated={'right'} as={Link} to={`/events/${id}`}>View</Button>
      </Segment>
    </Segment.Group>
  )
}

export default EventListItem