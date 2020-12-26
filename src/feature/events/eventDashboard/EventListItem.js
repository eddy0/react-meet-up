import React from 'react'
import { Button, Icon, Item, Label, List, Segment } from 'semantic-ui-react'
import EventlistAttendee from './EventlistAttendee'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteEvent } from '../eventActions'
import {format} from 'date-fns'
import { deleteEventInFirestore } from '../../../app/firestore/fireStoreService'

function EventListItem({event}) {
  let {id, title, date, description, city, venue, hostedBy, hostPhotoURL, attendees,} = event
  date = format(date, 'MMMM d, yyyy h:mm a')
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size={'tiny'} circular src={hostPhotoURL}/>
            <Item.Content>
              <Item.Header content={title}/>
              <Item.Description>
                hosted by <Link to={`/profile/${id}`}>{hostedBy}</Link>
              </Item.Description>
              {
                event.isCancelled && (
                  <Label style={{top: '-40px'}} ribbon={'right'} color={'red'} content={'this event has been cancelled'} />

                )
              }
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
        <Button color={'red'} floated={'right'} onClick={() => (deleteEventInFirestore(id))} >Delete</Button>
        <Button color={'teal'} floated={'right'} as={Link} to={`/events/${id}`}>View</Button>
      </Segment>
    </Segment.Group>
  )
}

export default EventListItem