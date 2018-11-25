import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import EventList from '../EventList/EventList'
import { events, IEvent } from '../../../utils/DATA'
import EventForm from './../EventForm/EventForm'
import Button from '@material-ui/core/Button'

interface IEventDashboardState {
  isOpen: boolean
  events: IEvent[]
  selected: IEvent | null
}

class EventDashboard extends React.Component<{}, IEventDashboardState> {
  state: IEventDashboardState = {
    isOpen: false,
    events: [],
    selected: null,
  }

  componentDidMount() {
    this.setState((prevState: IEventDashboardState) => {
      return {
        ...prevState,
        events: events,
      }
    })
  }

  handleToggleForm = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    this.setState({
      isOpen: true,
      selected: null,
    })
  }

  createEvent = (form: IEvent) => {
    console.log(form)
    this.setState((prevState) => {
      return {
        ...prevState,
        events: prevState.events.concat(form),
      }
    })
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

  deleteEvent = (id:string) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        events: prevState.events.filter((event) => event.id !== id)
      }
    })
  }

  render() {
    return (
      <div className='row'>
        <Grid container item xs={12}>
          <Grid container item xs={8} justify='center'>
            <h3>这是 hot load</h3>
            <EventList 
              handleToggleSelect={this.handleToggleSelect} 
              events={this.state.events}
              deleteEvent={this.deleteEvent} 
            />
          </Grid>
          <Grid container item xs={4} direction='column' alignItems='center'>
            <h4>right is hot fast</h4>
            <Button color='primary' variant='contained' onClick={this.handleToggleForm}>
              create form
            </Button>

            {
              this.state.isOpen && 
              <EventForm 
                event={this.state.selected} 
                createEvent={this.createEvent} 
                editEvent={this.handleEditEvent}
              />
            }
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default EventDashboard
