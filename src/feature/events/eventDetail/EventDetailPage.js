import React from 'react'
import { Grid } from 'semantic-ui-react'
import EventDetailHeader from './EventDetailHeader'
import EventDetailInfo from './EventDetailInfo'
import EventDetailChat from './EventDetailChat'
import EventDetailSidebar from './EventDetailSidebar'
import { useSelector } from 'react-redux'

const EventDetailPage = ({match, history}) => {
  const event = useSelector(state => state.event.events.find(e => e.id === match.params.id))
  console.log('event', event)
  if (event === undefined) {
    history.push('/')
  } else {
    const {id, title, date, category, description, city, venue, hostedBy, hostPhotoURL, attendees} = event
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailHeader event={event}/>
          <EventDetailInfo event={event}/>
          <EventDetailChat/>
        </Grid.Column>
        
        <Grid.Column width={6}>
          <EventDetailSidebar event={event}/>
        </Grid.Column>
      
      </Grid>
    )
  }
}

export default EventDetailPage
