import * as React from 'react'
import { Button, Grid, Icon, Segment } from 'semantic-ui-react'
import format from 'date-fns/format'

const EventDetailedInfo = ({event}) => {
  let eventDate
  if (event.date) {
    eventDate = event.date
  }
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="info"/>
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{event.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="teal"/>
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{format(eventDate, 'dddd Do MMM')} at {format(eventDate, 'h:mm A')}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="teal"/>
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{event.venue}</span>
          </Grid.Column>
          <Grid.Column width={4}>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  )
}

export default EventDetailedInfo