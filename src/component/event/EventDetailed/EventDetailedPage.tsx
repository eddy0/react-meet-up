import * as React from 'react'
import { Grid  } from '@material-ui/core'
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';

interface EventDetailedPageProps {}

const EventDetailedPage: React.SFC<EventDetailedPageProps> = (props) => {
  return (
    <div className='row'>
      <Grid container={true}>
        <Grid item xs={10}>
          <EventDetailedHeader />
          <EventDetailedInfo />
          <EventDetailedChat />
        </Grid>
        <Grid item xs={2}>
          <EventDetailedSidebar />
        </Grid>
      </Grid>
    </div>
  )
}

export default EventDetailedPage
