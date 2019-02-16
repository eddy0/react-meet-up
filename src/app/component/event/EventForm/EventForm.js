/*global google*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { withFirestore } from 'react-redux-firebase'
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react'
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from 'revalidate'

import { createEvent, handleUpdateEvent } from '../../../../action/eventAction'

import DateInput from '../../common/form/DateInput'
import TimeInput from '../../common/form/TimeInput'
import TextInput from '../../common/form/TextInput'
import SelectInput from '../../common/form/SelectInput'
import TextArea from '../../common/form/TextArea'
import PlaceInput from '../../common/form/PlaceInput'


const validate = combineValidators({
  title: isRequired({message: 'The event title is required'}),
  category: isRequired({message: 'Please provide a category'}),
  description: composeValidators(
    isRequired({message: 'Please enter a description'}),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be at least 5 characters'
    })
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
  date: isRequired('date')
})

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  }

  async componentDidMount() {
    const {firestore, match} = this.props
    await firestore.setListener(`events/${match.params.id}`)
  }

  async componentWillUnmount() {
    const {firestore, match} = this.props
    await firestore.unsetListener(`events/${match.params.id}`)
  }

  handleScriptLoaded = () => this.setState({scriptLoaded: true})


  onFormSubmit = values => {
    values.venueLatLng = this.state.venueLatLng
    if (this.props.initialValues.id) {
      if (Object.keys(values.venueLatLng).length === 0) {
        values.venueLatLng = this.props.event.venueLatLng
      }
      this.props.updateEvent(values)
      this.props.history.goBack()
    } else {
      this.props.createEvent(values)
      this.props.history.push('/events')
    }
  }


  checkChange = ({lat, lng}) => {
    this.props.change('geolocation', {
      lat: lat,
      lng: lng,
    })
  }

  render() {
    const {invalid, submitting, pristine, event, cancelToggle, loading} = this.props
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" align={'center'}/>
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
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
                placeholder="What is your event about"
                component={SelectInput}
                multiple={false}
                required={true}
              />
              <Field
                name="description"
                type="text"
                rows={3}
                label="Description"
                component={TextArea}
                placeholder="Event brief description"
                required={true}
              />
              <Header as='h4' dividing>
                About Date
              </Header>
              <Field
                name="date"
                type='text'
                showTime={true}
                label="please enter the date of the event"
                component={DateInput}
                onFocus={e => e.preventDefault()}
                onBlur={e => e.preventDefault()}
                required={true}
              />
              {/*<Field*/}
                {/*name="timeStart"*/}
                {/*type="text"*/}
                {/*label="Start time"*/}
                {/*component={TimeInput}*/}
                {/*placeholder="from"*/}
                {/*required={true}*/}
              {/*/>*/}
              {/*<Field*/}
                {/*name="timeEnd"*/}
                {/*type="text"*/}
                {/*label="End time"*/}
                {/*component={TimeInput}*/}
                {/*placeholder="to"*/}
                {/*required={true}*/}
              {/*/>*/}
              <Header as='h4' dividing>
                About Address
              </Header>
              <Field
                name="company"
                label="Business name"
                placeholder="the business address name"
                component={TextInput}
              />
              <Field
                label="Add the address"
                name='venue'
                type='text'
                component={PlaceInput}
                checkChange={this.checkChange}
                options={{types: ['(cities)']}}
                placeholder="City event is taking place"
              />
              <Button
                loading={loading}
                disabled={invalid || submitting || pristine}
                positive
                type="submit"
              >
                Submit
              </Button>
              <Button disabled={loading} onClick={this.props.history.goBack} type="button">
                Cancel
              </Button>
              {event.id &&
              <Button
                onClick={() => cancelToggle(!event.cancelled, event.id)}
                type='button'
                color={event.cancelled ? 'green' : 'red'}
                floated='right'
                content={event.cancelled ? 'Reactivate Event' : 'Cancel Event'}
              />}
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}


const mapState = (state, ownProps) => {
  let event = {}

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0]
  }

  return {
    initialValues: event,
    event,
    loading: state.loading
  }
}

const actions = {
  createEvent: createEvent,
  updateEvent: handleUpdateEvent,
  // cancelToggle
}

export default withFirestore(
  connect(mapState, actions)(
    reduxForm({form: 'eventForm', enableReinitialize: true, validate})(
      EventForm
    )
  )
)
