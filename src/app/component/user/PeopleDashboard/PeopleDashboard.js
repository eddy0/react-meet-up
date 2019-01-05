import React, { Component } from 'react'
import { Grid, Segment, Card, Header } from 'semantic-ui-react'

class PeopleDashboard extends Component {
  render() {
    return (
      <Grid>
      <Grid.Column width={16}>
        <Segment>
          <Header dividing content="People following me" />
          <Card.Group itemsPerRow={8} stackable>
          {/*{followers && followers.map(follower => <PersonCard key={follower.id} user={follower} />)}*/}
          personal card
          </Card.Group>
        </Segment>
        <Segment>
          <Header dividing content="People I'm following" />
          <Card.Group itemsPerRow={8} stackable>
            {/*{followers && followings.map(following => <PersonCard key={following.id} user={following} />)}*/}
            personal card
          </Card.Group>
        </Segment>
      </Grid.Column>
    </Grid>
    )
  }
}

export default PeopleDashboard