import React, { useState } from 'react'
import { Grid } from 'semantic-ui-react'
import EventList from './EventList'
import { sampleData } from '../../../app/api/data'
import { useSelector } from 'react-redux'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import EventListItemPlaceholder from './EventListPlaceholder'
import EventFilters from './EventFilters'

function EventDashboard(props) {
  const {events} = useSelector(state => state.event)
  const {loading} = useSelector(state => state.async)
  
  return (
    <Grid>
      <Grid.Column width={10}>
        {
          loading &&
          <>
            <EventListItemPlaceholder/>
            <EventListItemPlaceholder/>
          </>
        }
        <EventList events={events}/>
      </Grid.Column>
      <Grid.Column width={6}>
        <EventFilters />
      </Grid.Column>
    </Grid>
  )
}

export default EventDashboard