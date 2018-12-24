import React, { Component } from 'react'
import EventList from './EventList'
import { handleFetchEvent } from '../../../../action/eventAction'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'


class EventDashboard extends Component {

  componentDidMount() {
    if (this.props.events === null || Object.keys(this.props.events).length > 0) {
      this.props.handleFetchEvent()
    }
  }

  render() {
    const events = this.props.events
    return (
      <div className='row'>
        <Grid container item xs={12}>
          <Grid container item xs={8} justify='center'>
            {
              events &&
              <EventList events={events}/>
            }
          </Grid>
          <Grid container item xs={4} direction='column' alignItems='center'>
            <Button color='primary' variant='contained'>
              create form
            </Button>
          </Grid>
        </Grid>
      </div>
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