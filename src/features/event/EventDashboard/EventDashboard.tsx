import { Grid } from '@material-ui/core'
import * as React from 'react'

class EventDashboard extends React.Component {
  public render() {
    return (
      <Grid container={true}>
        <Grid item={true} xs={10}>
          <h2>left</h2>
        </Grid>
        <Grid item={true} xs={2}>
          <h2>right</h2>
        </Grid>
      </Grid>
    )
  }
}

export default EventDashboard
