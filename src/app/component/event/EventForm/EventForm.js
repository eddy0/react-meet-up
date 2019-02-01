import * as React from 'react'
import { connect } from 'react-redux'
import TextInput from '../../common/form/TextInput'
import { Field, reduxForm } from 'redux-form'
import TextArea from '../../common/form/TextArea'
import SelectInput from '../../common/form/SelectInput'
import { createEvent, handleUpdateEvent } from '../../../../action/eventAction'
import { Form, Grid, Header, Segment, Button } from 'semantic-ui-react'
import DateInput from '../../common/form/DateInput'
import { generate } from '../../../../utils/DATA'
import PlaceInput from '../../common/form/PlaceInput'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import Script from 'react-load-script'
import { log } from '../../../../utils/utils'


const category = [
  {key: 'drinks', text: 'Drinks', value: 'drinks'},
  {key: 'culture', text: 'Culture', value: 'culture'},
  {key: 'film', text: 'Film', value: 'film'},
  {key: 'food', text: 'Food', value: 'food'},
  {key: 'music', text: 'Music', value: 'music'},
  {key: 'travel', text: 'Travel', value: 'travel'}
]

const createNewEvent = (e) => {
  let event = {
    id: generate(),
    title: 'Trip to Tower of London',
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/10.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/30.jpg',
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/42.jpg',
      },
    ],
  }
  return Object.assign({}, event, e)
}

class EventForm extends React.Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  }

  handleScriptLoaded = () => this.setState({scriptLoaded: true})


  onFormSubmit = (form) => {
    console.log('form', form)
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


  render() {
    const event = this.props.initialValues
    console.log(event)
    const id = this.props.id
    const {loading, invalid, submitting, pristine} = this.props
    return (
      <Grid style={{margin: '0 auto', maxWidth: 1000}}>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAYVHNqmifVNgbn_Rzm1SLViGST1YOlfFg&libraries=places&language=en"
          onLoad={this.handleScriptLoaded}
        />
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details"/>
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Describe your event title"
              />
              <Field
                name="category"
                type="text"
                component={SelectInput}
                options={category}
                placeholder="What is your event about"
              />

              <Field
                name="description"
                type="text"
                component={TextArea}
                rows={3}
                placeholder="Tell us more details about your event"
              />
              <Header sub color="teal" content="Event Location details"/>
              <Field
                name="city"
                type="text"
                component={PlaceInput}
                options={{types: ['(cities)']}}
                placeholder="Event city"
                onSelect={this.handleCitySelect}
              />
              {this.state.scriptLoaded && (
                <Field
                  name="venue"
                  type="text"
                  component={PlaceInput}
                  options={{
                    // location: new window.google.maps.LatLng(this.state.cityLatLng),
                    // radius: 1000,
                    // types: ['establishment']
                  }}
                  placeholder="Event venue"
                  onSelect={this.handleVenueSelect}
                />
              )}
              <Field
                name="date"
                type="text"
                component={DateInput}
                placeholder="choose a date and time"
              />

              <Button
                loading={loading}
                disabled={invalid || submitting || pristine}
                positive
                type="submit"
              >
                {
                  event.id === undefined ? 'Submit' : 'Update'
                }
              </Button>
              <Button disabled={loading} onClick={this.props.history.goBack} type="button">
                Cancel
              </Button>
              {event && event.id &&
              <Button
                type="button"
                floated="right"
                content={'Cancel Event'}
              />}
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
  if (id && state.events.length > 0) {
    event = state.events.filter((event) => event.id === id)[0]
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

export default connect(mapStateToProps, mapActionsToProps)(reduxForm({
  enableReinitialize: true,
  form: 'eventForm'
})(EventForm))