import * as React from 'react'
import { Card, Divider, Typography } from '@material-ui/core'
import { InfoOutlined, CalendarToday, LocationOn } from '@material-ui/icons'
import styled from 'styled-components'
import { IEvent } from 'src/model/model';

const CardInfo = styled.div`
  display: flex;
  padding: 1rem;
  position: relative;
  align-items: center;

  & svg {
    margin-right: 1rem;
  }

`


interface EventDetailedInfoProps {
    event: IEvent
}


const EventDetailedInfo: React.SFC<EventDetailedInfoProps> = ({event}) => {
  return (
    <Card className='mg_t--sm'>
      <CardInfo>
        <InfoOutlined />
        <Typography variant='body1'> {event.description} </Typography>
      </CardInfo>
      <Divider />
      <CardInfo>
        <CalendarToday />
        <Typography variant='body1'>{event.date}</Typography>
      </CardInfo>
      <Divider />
      
      <CardInfo>
        <LocationOn />
        <Typography variant='body1'> {event.venue ? event.venue : 'address is not provided'} </Typography>
      </CardInfo>
    </Card>
  )
}

export default EventDetailedInfo
