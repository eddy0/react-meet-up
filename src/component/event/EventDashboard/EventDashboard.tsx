import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import EventList from '../EventList/EventList'
// import EventForm from './../EventForm/EventForm'
import Button from '@material-ui/core/Button'
import { IEvent } from '../../../model/model'
import { connect } from 'react-redux'
import { StoreState } from '../../../reducer'
import { handleActionFetchEvent } from '../../../action'
import { actionDeleteEvent, actionCreateEvent } from '../../../action/eventAction'

interface IEventDashboardState {
  events: IEvent[]
  selected: IEvent | null
}

interface IEventDashboardProps {
  fetchEvent: () => void
  createEvent: (form:IEvent) => void
  events: IEvent[],
}

class EventDashboard extends React.Component<IEventDashboardProps, IEventDashboardState> {
  state: IEventDashboardState = {
    events: this.props.events || [],
    selected: null,
  }

  componentDidMount() {
    if (this.state.events.length < 1) {
      this.props.fetchEvent()
    }
  }


  deleteEvent = (id: string) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        events: prevState.events.filter((event) => event.id !== id),
      }
    })
  }

  render() {
    const event = this.props.events
    return (
      <div className='row'>
        <Grid container item xs={12}>
          <Grid container item xs={8} justify='center'>
            <EventList  events={event} deleteEvent={this.deleteEvent} />
          </Grid>
          <Grid container item xs={4} direction='column' alignItems='center'>
            <Button color='primary' variant='contained' >
              create  a form 
            </Button>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state: StoreState) => {
  return {
    events: state.events,
  }
}

const mapDispatchToProps:{} = {
  fetchEvent: handleActionFetchEvent,
  createEvent: actionCreateEvent,
  deleteEvent:actionDeleteEvent
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventDashboard)
