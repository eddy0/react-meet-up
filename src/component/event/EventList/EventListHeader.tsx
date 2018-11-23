import * as React from 'react'
import { Avatar, Grid, Typography } from '@material-ui/core'
import { IEvent } from '../../../utils/DATA'

interface HeaderProps {
  event: IEvent
}

export default function EventListHeader({ event }: HeaderProps) {
  return (
    <Grid container={true} style={{ padding: '1rem' }}>
      <Grid item>
        <Avatar src={event.hostPhotoURL || 'assets/images/user.png'} />
      </Grid>
      <Grid item style={{ flex: 1, marginLeft: '2rem' }}>
        <Typography variant='subtitle1'>{event.title}</Typography>
        <Typography variant='subtitle2'>Hosted by {event.hostedBy}</Typography>
      </Grid>
    </Grid>
  )
}
