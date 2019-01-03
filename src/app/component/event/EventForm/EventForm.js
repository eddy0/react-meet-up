import * as React from 'react'
import { connect } from 'react-redux'
import TextInput from '../../common/form/TextInput'
import { Field, reduxForm } from 'redux-form'
import TextArea from '../../common/form/TextArea'
import SelectInput from '../../common/form/SelectInput'
import { handleCreateEvent, handleUpdateEvent } from '../../../../action/eventAction'
import { Form, Grid, Header, Segment, Button } from 'semantic-ui-react'
import DateInput from '../../common/form/DateInput'
import { generate } from '../../../../utils/DATA'


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

  onFormSubmit = (form) => {
    console.log('form', form)
    let f
    if (this.props.event !== null) {
      f = {...this.props.event, ...form}
      this.props.editEvent(f, () => {
        this.props.history.goBack()
      })
    } else {
      f = createNewEvent(form)
      this.props.createEvent(f, () => {
        this.props.history.push('/events')
      })
    }
  }

  render() {
    const event = this.props.initialValues
    console.log(event)
    const id = this.props.id
    const {loading, invalid, submitting, pristine} = this.props
    return (
      <Grid>
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
                name="date"
                type="text"
                component={DateInput}
                placeholder="choose a date"
              />
              <Field
                name="description"
                type="text"
                component={TextArea}
                rows={3}
                placeholder="Tell us more details about your event"
              />
              <Header sub color="teal" content="Event Location details"/>
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
                type='button'
                floated='right'
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
  createEvent: handleCreateEvent,
  editEvent: handleUpdateEvent,
}

export default connect(mapStateToProps, mapActionsToProps)(reduxForm({
  enableReinitialize: true,
  form: 'eventForm'
})(EventForm))