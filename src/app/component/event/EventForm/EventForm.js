import * as React from 'react'
import { connect } from 'react-redux'
import TextInput from '../../common/form/TextInput'
import { Field, reduxForm } from 'redux-form'
import TextArea from '../../common/form/TextArea'
import SelectInput from '../../common/form/SelectInput'
import { createEvent, handleUpdateEvent } from '../../../../action/eventAction'
import { Form, Grid, Header, Segment, Button } from 'semantic-ui-react'
import DateInput from '../../common/form/DateInput'
import PlaceInput from '../../common/form/PlaceInput'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { log } from '../../../../utils/utils'
import { withFirestore } from 'react-redux-firebase'
import TimeInput from '../../common/form/TimeInput'


class EventForm extends React.Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  }

  async componentDidMount() {
    const {firestore, match} = this.props
    if (match.params.id) {
      await firestore.setListener(`events/${match.params.id}`)
    }
  }

  async componentWillUnmount() {
    const {firestore, match} = this.props
    if (match.params.id) {
      await firestore.unsetListener(`events/${match.params.id}`)
    }
  }

  handleScriptLoaded = () => this.setState({scriptLoaded: true})


  onFormSubmit = (form) => {
    let f
    if (this.props.event && Object.keys(this.props.event).length > 0) {
      f = {...this.props.event, ...form}
      this.props.editEvent(f, () => {
        this.props.history.goBack()
      })
    } else {
      // f = createNewEvent(form)
      log('create new event')
      this.props.createEvent(form)
      this.props.history.push('/events')
    }
  }

  handleCitySelect = (selectedCity) => {
    geocodeByAddress(selectedCity).then(results => getLatLng(results[0])).then(latlng => {
      this.setState({
        cityLatLng: latlng
      })
    }).then(() => {
      this.props.change('city', selectedCity)
    })
  }

  handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue).then(results => getLatLng(results[0])).then(latlng => {
      this.setState({
        venueLatLng: latlng
      })
    }).then(() => {
      this.props.change('venue', selectedVenue)
    })
  }

  checkChange = ({lat, lng}) => {
    this.props.change('geolocation', {
      lat: lat,
      lng: lng,
    })
  }


  render() {
    const {invalid, submitting, pristine, handleSubmit} = this.props
    return (
      <Grid>
        <Grid.Column width={15}>
          <Segment>
            <Header as='h2' textAlign='center'>
              New Event
            </Header>
            <Form onSubmit={handleSubmit(this.onFormSubmit)} autoComplete="off">
              <Header as='h4' dividing>
                About Event
              </Header>
              <Field
                name="title"
                label="Title"
                placeholder="enter the title"
                component={TextInput}
                required={true}
              />
              <Field
                name="category"
                label="Category"
                placeholder="enter the title"
                component={SelectInput}
                multiple={false}
                required={true}
              />
              <Field
                name="description"
                type="text"
                rows="2"
                label="Description"
                component={TextArea}
                placeholder="Event brief description, less than 140 words"
                required={true}
              />
              <Field
                name="details"
                type="text"
                rows="4"
                label="Details"
                component={TextArea}
                placeholder="Write some details of this the event"
                required={true}
              />
              <Field
                name="capacity"
                type="number"
                label="People capacity"
                placeholder="enter the how many people"
                component={TextInput}
                required={true}
              />
              <Header as='h4' dividing>
                About Date
              </Header>
              <Field
                name="date"
                type='text'
                label="please enter the date of the event"
                component={DateInput}
                onFocus={e => e.preventDefault()}
                onBlur={e => e.preventDefault()}
                required={true}
              />

              <Field
                name="timeStart"
                type="text"
                label="Start time"
                component={TimeInput}
                placeholder="from"
                required={true}
              />
              <Field
                name="timeEnd"
                type="text"
                label="End time"
                component={TimeInput}
                placeholder="to"
                required={true}
              />
              <Header as='h4' dividing>
                About Address
              </Header>
              <Field
                name="company"
                label="Business name"
                placeholder="the business address name"
                component={TextInput}
                required={true}
              />
              <Field
                label="Add the address"
                name='address'
                type='text'
                component={PlaceInput}
                checkChange={this.checkChange}
                options={{types: ['(cities)']}}
                placeholder="City event is taking place"
              />
              <div>
                <Button positive type="submit" disabled={invalid || submitting || pristine}>
                  Submit
                </Button>
                <Button type="button" onClick={() => this.props.history.goBack()}>Cancel</Button>
              </div>
            </Form>
          </Segment>
        </Grid.Column>

      </Grid>
    )
  }
}


const mapStateToProps = (state, props) => {
  const id = props.match.params.id
  let event = {}
  if (id && state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0]
  }
  return {
    initialValues: event,
    id: id,
    event: event,
  }
}

const mapActionsToProps = {
  createEvent: createEvent,
  editEvent: handleUpdateEvent,
}

export default withFirestore(
  connect(mapStateToProps, mapActionsToProps)(
    reduxForm({enableReinitialize: true, form: 'eventForm'})(EventForm)
  ))