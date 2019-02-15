import React, { Component } from 'react'
import EventDetailedHeader from './EventDetailedHeader'
import EventDetailedInfo from './EventDetailedInfo'
import EventDetailedChat from './EventDetailedChat'
import EventDetailedSidebar from './EventDetailedSidebar'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import { firebaseConnect, withFirestore } from 'react-redux-firebase'
import { compose } from 'redux'
import { objectToArray } from '../../../../utils/utils'
import { toastr } from 'react-redux-toastr'


class EventDetailedPage extends Component {

  async componentDidMount() {
    const {firestore, match} = this.props
    let event = await firestore.get(`events/${match.params.id}`)
    if (!event.exists) {
      toastr.error('Not found', 'This is not the event you are looking for')
      this.props.history.push('/error')
    }
    await firestore.setListener(`events/${match.params.id}`)
    this.setState({
      initialLoading: false
    })
  }


  async componentWillUnmount() {
    const {firestore, match} = this.props
    await firestore.unsetListener(`events/${match.params.id}`)
  }


  render() {
    if (!this.props.event) {
      return <Redirect to={'/events'}/>
    }
    const event = this.props.event
    const attendees = event && event.attendees && objectToArray(event.attendees)

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader event={event}/>
          <EventDetailedInfo event={event}/>
          <EventDetailedChat/>
        </Grid.Column>
        <Grid.Column width={4}>
          <EventDetailedSidebar attendees={attendees}/>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state, props) => {
  let event = {}
  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0]
  }
  return {
    event: event,
    requesting: state.firestore.status.requesting,
    loading: state.loading,
    auth: state.firebase.auth,
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