import React from 'react'
import { Image, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function EventAttendees(props) {
  const attendee = props.attendee
  return (
          <List.Item>
            <Image as={Link} to={`/profile/${attendee.id}`} size="mini" circular src={attendee.photoURL}/>
          </List.Item>
          )
}

export default EventAttendees