import React from 'react'
import EventListItem from './EventListItem'

function EventList({events, setFormOpen}) {
  return (
    <>
      {
        events.map((event) => {
          return <EventListItem key={event.id} event={event} setFormOpen={setFormOpen}/>
        })
      }
    </>
  )
}

export default EventList