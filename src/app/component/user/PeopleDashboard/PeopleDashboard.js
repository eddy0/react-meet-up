import React, { Component } from 'react'
import { Grid, Segment, Card, Header } from 'semantic-ui-react'
import PersonCard from './PersonCard'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { log } from '../../../../utils/utils'

class PeopleDashboard extends Component {
  render() {
    const {followings, followers} = this.props
    return (
      <Grid>
        <Grid.Column width={16}>
          <Segment>
            <Header dividing content="People following me"/>
            <Card.Group itemsPerRow={8} stackable>
              personal card
              {followers && followers.map(follower => <PersonCard key={follower.id} user={follower}/>)}
            </Card.Group>
          </Segment>
          <Segment>
            <Header dividing content="People I'm following"/>
            <Card.Group itemsPerRow={8} stackable>
              personal card
              {followers && followings.map(following => <PersonCard key={following.id} user={following} />)}
            </Card.Group>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapState = (state) => {
  return {
    followings: state.firestore.ordered.following,
    followers: state.firestore.ordered.followers,
    auth: state.firebase.auth,
  }
}

const query = ({auth}) => {
  log(auth)
  return [
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{collection: 'following'}],
      storeAs: 'following',
    },
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{collection: 'followers'}],
      storeAs: 'followers',
    },
  ]
}

export default compose(
  connect(mapState),
  firestoreConnect((props) => query(props)),
)(PeopleDashboard)

