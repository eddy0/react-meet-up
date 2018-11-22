import * as React from 'react'
import { Grid, Typography } from '@material-ui/core'
import EventListItem from './EventListItem'


interface EventItem {
  id: string,
}

interface Props {
  events: EventItem[]
}

class EventList extends React.Component<Props> {
  render() {
    const { events } = this.props
    return (
      <Grid container alignItems='center' direction='column'>
        {events.map((event) => {
          return <EventListItem key={event.id} event={event} />
        })}
        {/* <EventListItem />
        <EventListItem /> */}
      </Grid>
    )
  }
}

export default EventList
