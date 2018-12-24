import React from 'react'
import EventAttendees from './EventAttendees'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import EventListHeader from './EventListHeader'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import { Timer, CalendarToday } from '@material-ui/icons'


const CardBox = styled(Card)`
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


function EventListItem(props) {
  const event = props.event
  return (
    <CardBox>
      <EventListHeader event={event}/>
      <Divider/>
      <CardInfo>
        <div>
          <CalendarToday/>
          <Typography>date: {new Date(Date.parse(event.date)).toLocaleDateString()}</Typography>
        </div>
        <div>
          <Timer/>
          <Typography>time: {new Date(Date.parse(event.date)).toLocaleTimeString()}</Typography>
        </div>
      </CardInfo>
      <Divider/>
      <CardContent>
        {
          event.attendees &&
          <EventAttendees attendees={event.attendees}/>
        }
      </CardContent>
      <Divider/>
      <CardContent style={{display: 'flex'}}>
        <Grid item style={{flex: 1}}>
          {'description this is to get the brief info of the event'}
          {event.description}
        </Grid>
        <Grid item style={{justifySelf: 'flex-end', alignSelf: 'flex-end'}}>
          <Link to={`/event/${event.id}`}>
            <Button variant='contained' color='primary'>
              view
            </Button>
          </Link>
        </Grid>
      </CardContent>
    </CardBox>
  )
}

export default EventListItem