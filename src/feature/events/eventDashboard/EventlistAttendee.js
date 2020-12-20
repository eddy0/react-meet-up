import React from 'react'
import { Image, List } from 'semantic-ui-react'

const EventlistAttendee = ({attendee}) => {
  const {id, name, photoURL} = attendee
  return (
    <List.Item>
      <Image size={'mini'} circular src={photoURL} />
    </List.Item>
  )
}

export default EventlistAttendee