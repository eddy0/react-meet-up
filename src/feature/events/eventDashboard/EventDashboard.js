import React from 'react'
import { Grid } from 'semantic-ui-react'

function EventDashboard(props) {
  return (
    <Grid>
      <Grid.Column width={10}>
        <h2> left Column</h2>
      </Grid.Column>
      <Grid.Column width={6}>
        <h2> Right Column</h2>
      </Grid.Column>
    </Grid>
  )
}

export default EventDashboard