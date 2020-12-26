import React from 'react'
import { Image, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const EventlistAttendee = ({attendee}) => {
  const {id, name, photoURL} = attendee
  return (
    <List.Item as={Link} to={`/profile/${id}`}>
      <Image size={'mini'} circular src={photoURL} />
    </List.Item>
  )
}

export default EventlistAttendee