import React from 'react'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

export default function EventListHeader({event}) {
  return (
    <Grid container={true} style={{padding: '1rem'}}>
      <Grid item>
        <Avatar src={event.hostPhotoURL || 'assets/images/user.png'}/>
      </Grid>
      <Grid item style={{flex: 1, marginLeft: '2rem'}}>
        <Typography variant='subtitle1'>{event.title}</Typography>
        <Typography variant='subtitle2'>Hosted by {event.hostedBy}</Typography>
      </Grid>
    </Grid>
  )
}