import * as React from 'react'
import { Card, CardHeader, CardActions, Button, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { IEvent } from 'src/model/model';
import { Link } from 'react-router-dom'


const HeaderMessage = styled.div`
  position: absolute;
  left: 5%;
  bottom: 5%;
  color: #fff;
`

interface EventDetailedHeaderProps {
  event: IEvent
}

const EventDetailedHeader: React.SFC<EventDetailedHeaderProps> = ({event}) => {
  return (
    <Card style={ {width: '100%'} }>
      <CardHeader title='Header'/>
      <div style={ {width: '100%', position: 'relative'} }>
        <img style={ {filter: 'brightness(30%'} } src={ `/assets/categoryImages/${ event.category }.jpg` } alt='culture'/>
        <HeaderMessage>
          <Typography color='inherit' variant='h5'>{ event.title }</Typography>
          <Typography color='inherit' variant='body1'>{ event.date }</Typography>
          <Typography color='inherit' variant='caption'>hosted By { event.hostedBy }</Typography>
        </HeaderMessage>
      </div>
      <CardActions style={ {padding: '0.5rem'} }>
        <Button size="small">cancel reservation</Button>
        <Button size="small" variant='contained' color='primary'>join the event</Button>
        <Link to={ `/event/manage/${ event.id }` } color='inherit' style={ {marginLeft: 'auto'} }>
          <Button size="small" variant='contained' color='secondary'>
            Manage Event
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}

export default EventDetailedHeader
