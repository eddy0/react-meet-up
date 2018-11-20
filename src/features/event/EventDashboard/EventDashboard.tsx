import {Grid} from '@material-ui/core'
import * as React from 'react'
import EventList from "../EventList/EventList";

class EventDashboard extends React.Component {
  public render() {
    return (
      <Grid container={true} style={{marginTop: '5rem',}}>
        <Grid item={true} sm={8} >
          <h2>left</h2>
          <EventList />
        </Grid>
        <Grid item={true} sm={4}>
          <h2>right</h2>
        </Grid>
      </Grid >
    )
  }
}

export default EventDashboard
