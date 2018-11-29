import * as React from 'react'
import { Grid } from '@material-ui/core'
import EventListItem from './EventListItem'
import {  IEvent } from './../../../model/model'


interface Props {
  events: IEvent[]
  handleToggleSelect(form: IEvent): void
  deleteEvent(id: string): void
}

class EventList extends React.Component<Props> {
  render() {
    const { events } = this.props
    return (
      <Grid container alignItems='center' direction='column'>
        {events.map((event) => {
          return <EventListItem handleToggleSelect={this.props.handleToggleSelect} deleteEvent={this.props.deleteEvent} key={event.id} event={event} />
        })}
      </Grid>
    )
  }
}

export default EventList
