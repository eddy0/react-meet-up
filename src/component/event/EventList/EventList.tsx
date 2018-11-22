import * as React from 'react'
import { Grid, Typography } from '@material-ui/core'
import EventListItem from './EventListItem'

interface IProps {
  events: {id: '' }[]
}

class EventList extends React.Component<IProps> {
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
