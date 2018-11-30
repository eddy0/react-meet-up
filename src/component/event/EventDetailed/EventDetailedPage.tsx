import * as React from 'react'
import { Grid, Divider  } from '@material-ui/core'
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';

interface EventDetailedPageProps {}

const EventDetailedPage: React.SFC<EventDetailedPageProps> = (props) => {
  return (
    <div className='row'>
      <Grid container={true} style={{justifyContent: 'space-between'}}>
        <Grid item xs={7}>
          <EventDetailedHeader />
          <Divider />
          <EventDetailedInfo />
          <EventDetailedChat />
        </Grid>
        <Grid item xs={4}>
          <EventDetailedSidebar />
        </Grid>
      </Grid>
    </div>
  )
}

export default EventDetailedPage
