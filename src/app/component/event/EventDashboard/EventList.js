import React, { Component } from 'react'
import EventListItem from './EventListItem'
import Grid from '@material-ui/core/Grid'


class EventList extends Component {
  render() {
    const events = this.props.events
    return (
      <Grid container alignItems='center' direction='column'>
        {events.map((event) => {
          return <EventListItem  key={event.id} event={event}/>
        })}
      </Grid>
    )
  }
}

export default EventList