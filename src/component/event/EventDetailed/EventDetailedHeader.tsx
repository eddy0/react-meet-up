import * as React from 'react'
import { Card, CardHeader, CardActions, Button, Typography } from '@material-ui/core'
import styled from 'styled-components'

interface EventDetailedHeaderProps {}

const HeaderMessage = styled.div`
  position: absolute;
  left: 5%;
  bottom: 5%;
  color: #fff;
`



const EventDetailedHeader: React.SFC<EventDetailedHeaderProps> = (props) => {
  return (
    <Card style={{ width: '100%'}}>
      <CardHeader title='Header' />
      <div style={{ width: '100%', position: 'relative' }}>
        <img style={{ filter: 'brightness(30%' }} src='/assets/categoryImages/culture.jpg' alt='culture' />
        <HeaderMessage>
          <Typography color='inherit' variant='h5'>Event Title</Typography>
          <Typography color='inherit' variant='body1'>Event data</Typography>
          <Typography color='inherit' variant='caption'>hosted By</Typography>
        </HeaderMessage>
      </div>
      <CardActions style={{padding: '0.5rem'}}>
        <Button size="small" >cancel reservation</Button>
        <Button size="small" variant='contained' color='primary'>join the event</Button>
        <Button size="small" variant='contained' color='secondary' style={{marginLeft: 'auto'}}>Manage Event</Button>
      </CardActions>
    </Card>
  )
}

export default EventDetailedHeader
