import React, { useState } from 'react'
import { Grid } from 'semantic-ui-react'
import EventList from './EventList'
import { sampleData } from '../../../app/api/data'

function EventDashboard(props) {
  const [events, setEvents] = useState(sampleData)
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
          Event sidebar
      </Grid.Column>
    </Grid>
  )
}

export default EventDashboard