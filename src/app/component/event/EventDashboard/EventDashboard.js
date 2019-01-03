import React, { Component } from 'react'
import EventList from './EventList'
import { handleFetchEvent } from '../../../../action/eventAction'
import { connect } from 'react-redux'
import { Button, Grid } from 'semantic-ui-react'

const {Column} = Grid

class EventDashboard extends Component {

  componentDidMount() {
    if (this.props.events === null || Object.keys(this.props.events).length === 0) {
      this.props.handleFetchEvent()
    }
  }

  render() {
    const events = this.props.events
    return (
      <Grid>
        <Column width={10}>
            {
              events &&
              <EventList events={events}/>
            }
        </Column>
        <Column width={6}>
            <Button>
              create form
            </Button>
        </Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  let events = null
  if (state.events.length > 0) {
    events = state.events
  }
  return {
    events,
  }
}

const mapDispatchToProps = ({
  handleFetchEvent,
})

export default connect(mapStateToProps, mapDispatchToProps)(EventDashboard)