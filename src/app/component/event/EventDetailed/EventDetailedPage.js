import  React from 'react'
import { Grid, Divider  } from '@material-ui/core'
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import { connect } from 'react-redux';
import {  Redirect } from 'react-router-dom';



const EventDetailedPage= (props) => {
  if (!props.event) {
    return <Redirect to={'/events'} />
  }
  const event = props.event
  return (
    <div className='row'>
      <Grid container={true} style={{justifyContent: 'space-between'}}>
        <Grid item xs={7}>
          <EventDetailedHeader event={event} />
          <Divider />
          <EventDetailedInfo event={event} />
          <EventDetailedChat />
        </Grid>
        <Grid item xs={4}>
          <EventDetailedSidebar attendees={event.attendees} />
        </Grid>
      </Grid>
    </div>
  )
}


const mapStateToProps = (state, props) => {
  const id = props.match.params.id
  let event= state.events.filter((event) => event.id === id)[0]
  return {
    event: event
  }
}

export default connect(mapStateToProps)(EventDetailedPage)