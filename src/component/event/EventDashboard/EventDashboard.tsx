import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import EventList from '../EventList/EventList'
// import EventForm from './../EventForm/EventForm'
import Button from '@material-ui/core/Button'
import { IEvent } from 'src/model/model'
import { connect } from 'react-redux'
import { StoreState } from './../../../reducer/index'
import { handleActionFetchEvent } from './../../../action/index'
import { actionDeleteEvent, actionCreateEvent } from './../../../action/eventAction'

interface IEventDashboardState {
  isOpen: boolean
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
    isOpen: false,
    events: this.props.events || [],
    selected: null,
  }

  componentDidMount() {
    if (this.state.events.length < 1) {
      this.props.fetchEvent()
    }
  }

  handleToggleForm = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    this.setState({
      isOpen: true,
      selected: null,
    })
  }

  createEvent = (form: IEvent) => {
    this.props.createEvent(form)
    // console.log(form)
    // this.setState((prevState) => {
    //   return {
    //     ...prevState,
    //     events: prevState.events.concat(form),
    //   }
    // })
  }

  handleToggleSelect = (form: IEvent): void => {
    this.setState((prevState) => {
      return {
        ...prevState,
        isOpen: true,
        selected: form,
      }
    })
  }

  handleEditEvent = (form: IEvent) => {
    console.log(form)
    this.setState((prevState) => {
      return {
        ...prevState,
        events: prevState.events.map((event) => {
          if (event.id === form.id) {
            return form
          }
          return event
        }),
        selected: null,
      }
    })
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
            <EventList handleToggleSelect={this.handleToggleSelect} events={event} deleteEvent={this.deleteEvent} />
          </Grid>
          <Grid container item xs={4} direction='column' alignItems='center'>
            <Button color='primary' variant='contained' onClick={this.handleToggleForm}>
              create form
            </Button>
            {/*{this.state.isOpen && <EventForm event={this.state.selected} createEvent={this.createEvent} editEvent={this.handleEditEvent} />}*/}
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

const mapDispatchToProps = {
  fetchEvent: handleActionFetchEvent,
  createEvent: actionCreateEvent,
  deleteEvent:actionDeleteEvent
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventDashboard)
