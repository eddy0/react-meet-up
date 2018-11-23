import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import EventList from '../EventList/EventList'
import { events } from '../../../utils/DATA'

class EventDashboard extends React.Component<any, any> {
  render() {
    return (
      <div className='row'>
        <Grid container item xs={12}>
          <Grid container item xs={8} justify='center'>
            <h3>这是 hot load</h3>
            <EventList events={events} />
          </Grid>
          <Grid container item xs={4} justify='center'>
            <h4>right is hot fast</h4>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default EventDashboard
