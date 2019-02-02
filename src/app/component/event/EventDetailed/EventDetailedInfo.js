import * as React from 'react'
import { Button, Grid, Icon, Segment } from 'semantic-ui-react'
import format from 'date-fns/format'
import EventDetailedMap from './EventDetailedMap'


class EventDetailedInfo extends React.Component {
  state = {
    showMap: false
  }

  componentWillUnmount() {
    this.setState({
      showMap: false
    })
  }

  toggleMap = () => {
    this.setState((prevState) => {
      return {
        showMap: !prevState.showMap,
      }
    })
  }


  render() {
    const {event} = this.props
    let eventDate
    if (event.date) {
      eventDate = event.date.toDate()
    }
    return (
      <Segment.Group>
        <Segment attached="top">
          <Grid>
            <Grid.Column width={1}>
              <Icon size="large" color="teal" name="info"/>
            </Grid.Column>
            <Grid.Column width={15}>
              <p>{event.description}</p>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="calendar" size="large" color="teal"/>
            </Grid.Column>
            <Grid.Column width={15}>
              <span>{format(eventDate, 'dddd Do MMM')} at {format(eventDate, 'h:mm A')}</span>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="marker" size="large" color="teal"/>
            </Grid.Column>
            <Grid.Column width={11}>
              <span>{event.venue}</span>
            </Grid.Column>
            <Grid.Column width={4}>
              <Button onClick={this.toggleMap} color={'teal'} size="tiny" floated={'right'}>View on map</Button>
            </Grid.Column>
          </Grid>
        </Segment>
        {
          this.state.showMap === true &&
          <EventDetailedMap lat={34.1846772} lng={-118.4045909}/>
        }
      </Segment.Group>
    )
  }
}

export default EventDetailedInfo