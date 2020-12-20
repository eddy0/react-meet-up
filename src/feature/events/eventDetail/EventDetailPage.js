import React from 'react'
import { Grid } from 'semantic-ui-react'
import EventDetailHeader from './EventDetailHeader'
import EventDetailInfo from './EventDetailInfo'
import EventDetailChat from './EventDetailChat'
import EventDetailSidebar from './EventDetailSidebar'

const EventDetailPage = () => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader/>
        <EventDetailInfo/>
        <EventDetailChat/>
      </Grid.Column>
      
      <Grid.Column width={6}>
        <EventDetailSidebar/>
      </Grid.Column>
    
    </Grid>
  )
}

export default EventDetailPage