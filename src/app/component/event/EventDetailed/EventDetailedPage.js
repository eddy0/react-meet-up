import React, {Component} from 'react'
import EventDetailedHeader from './EventDetailedHeader'
import EventDetailedInfo from './EventDetailedInfo'
import EventDetailedChat from './EventDetailedChat'
import EventDetailedMap from './EventDetailedMap'
import EventDetailedSidebar from './EventDetailedSidebar'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import { firebaseConnect, withFirestore } from 'react-redux-firebase'
import { compose } from 'redux'


class EventDetailedPage extends Component {
  render() {

    if (!this.props.event) {
      return <Redirect to={'/events'}/>
    }
    const event = this.props.event
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader event={event}/>
          <EventDetailedInfo event={event}/>
          <EventDetailedChat/>
        </Grid.Column>
        <Grid.Column width={4}>
          <EventDetailedSidebar attendees={event.attendees}/>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state, props) => {
  const id = props.match.params.id
  let event = state.events.filter((event) => event.id === id)[0]
  return {
    event: event
  }
}

const actions = {}

const query = (props) => {
  if (props.auth.isLoaded && !props.auth.isEmpty) {
    return [`event_chat/${props.match.params.id}`]
  }
}

export default compose(
  withFirestore,
  connect(mapStateToProps, actions),
  firebaseConnect((props => query(props))),
)(EventDetailedPage)