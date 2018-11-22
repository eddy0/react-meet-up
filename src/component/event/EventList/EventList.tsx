import React, { Component } from 'react'
import { Grid, Typography } from '@material-ui/core'
import EventListItem from './EventListItem'

class EventList extends Component {
  render() {
    const { events } = this.props
    return (
      <Grid container alignItems='center' direction='column'>
        {events.map((event, index) => {
          return <EventListItem key={event.id} event={event} />
        })}
        {/* <EventListItem />
        <EventListItem /> */}
      </Grid>
    )
  }
}

export default EventList
