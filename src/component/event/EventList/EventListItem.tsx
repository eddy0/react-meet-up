import * as React from 'react'
import { Grid, Divider, Typography, Button, Card, CardContent } from '@material-ui/core'
import styled from 'styled-components'
import { CalendarToday, Timer } from '@material-ui/icons'
import EventAttendee from './EventListAttendee'
import EventListHeader from './EventListHeader'
import { IEvent } from '../../../utils/DATA';
import { CardProps } from '@material-ui/core/Card';

const CardBox:React.SFC<CardProps> = styled(Card)`
  && {
    width: 90%;
    margin: 1rem 0;
  }
`
const CardInfo = styled.div`
  display: flex;
  padding: 0.5rem 1rem;
  position: relative;
  background-color: #f7f7f7;

  & div {
    display: flex;
    align-items: center;
    padding: 0 0.5rem;

    & svg {
      padding-right: 0.5rem;
    }

    & p {
      text-transform: uppercase;
    }
  }

  & div:first-child {
    border-right: 1px solid #888;
  }
`


interface IPropsEventListItem {
  event: IEvent
}

class EventListItem extends React.Component<IPropsEventListItem> {
  render() {
    const { event } = this.props
    return (
      <CardBox>
        <EventListHeader event={event} />
        <Divider />
        <CardInfo>
          <div>
            <CalendarToday />
            <Typography>date: {new Date(Date.parse(event.date)).toLocaleDateString()}</Typography>
          </div>
          <div>
            <Timer />
            <Typography>time: {new Date(Date.parse(event.date)).toLocaleTimeString()}</Typography>
          </div>
        </CardInfo>
        <Divider />
        <CardContent>
            {
              event.attendees &&
              <EventAttendee attendees={event.attendees} />
            }
        </CardContent>
        <Divider />
        <CardContent style={{ display: 'flex' }}>
          <Grid item style={{ flex: 1 }}>
            {'description this is to get the brief info of the event'}
            {event.description} 
          </Grid>
          <Grid item style={{ justifySelf: 'flex-end', alignSelf: 'flex-end' }}>
            <Button variant='contained' color='primary'>
              view
            </Button>
          </Grid>
        </CardContent>
      </CardBox>
    )
  }
}

export default EventListItem
