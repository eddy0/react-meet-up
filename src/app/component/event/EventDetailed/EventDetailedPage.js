import React from 'react'
import EventDetailedHeader from './EventDetailedHeader'
import EventDetailedInfo from './EventDetailedInfo'
import EventDetailedChat from './EventDetailedChat'
import EventDetailedMap from './EventDetailedMap'
import EventDetailedSidebar from './EventDetailedSidebar'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {Grid} from 'semantic-ui-react'


const EventDetailedPage = (props) => {
  if (!props.event) {
    return <Redirect to={'/events'} />
  }
  const event = props.event
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={4}>
        <EventDetailedSidebar attendees={event.attendees} />
      </Grid.Column>
    </Grid>
  )
}


const mapStateToProps = (state, props) => {
  const id = props.match.params.id
  let event = state.events.filter((event) => event.id === id)[0]
  return {
    event: event
  }
}

export default connect(mapStateToProps)(EventDetailedPage)