import React, { useState } from 'react'
import { Grid } from 'semantic-ui-react'
import EventList from './EventList'
import EventForm from '../eventForm/EventForm'
import { sampleData } from '../../../app/api/data'

function EventDashboard(props) {
  const [events, setEvents] = useState(sampleData)
  const [formOpen, setFormOpen] = useState(false)
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events}/>
      </Grid.Column>
      <Grid.Column width={6}>
        {
          formOpen &&
          <EventForm/>
        }
      </Grid.Column>
    </Grid>
  )
}

export default EventDashboard