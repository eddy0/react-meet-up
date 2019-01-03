import * as React from 'react'
// import { generate } from 'src/utils/DATA'
import { connect } from 'react-redux'
import TextInput from '../../common/form/TextInput'
import { Field, reduxForm } from 'redux-form'
import TextArea from '../../common/form/TextArea'
import SelectInput from '../../common/form/SelectInput'
import { actionCreateEvent, actionUpdateEvent } from '../../../../action/eventAction'
import { Form, Grid, Header, Segment, Button } from 'semantic-ui-react'
import DateInput from '../../common/form/DateInput'


const category = [
  {key: 'drinks', text: 'Drinks', value: 'drinks'},
  {key: 'culture', text: 'Culture', value: 'culture'},
  {key: 'film', text: 'Film', value: 'film'},
  {key: 'food', text: 'Food', value: 'food'},
  {key: 'music', text: 'Music', value: 'music'},
  {key: 'travel', text: 'Travel', value: 'travel'}
]

class EventForm extends React.Component {

  onFormSubmit = (form) => {
    console.log('form', form)
    // let f: IEvent
    // if (props.event !== null) {
    //   f = {...props.event, ...form}
    //   props.editEvent(f)
    //   props.history.goBack()
    // } else {
    //   f = createNewEvent(form)
    //   props.createEvent(f)
    //   props.history.push('/events')
    // }
  }

  render() {
    const event = this.props.event
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
                Submit
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
  }
}

const mapActionsToProps = {
  createEvent: actionCreateEvent,
  editEvent: actionUpdateEvent,
}

export default connect(mapStateToProps, mapActionsToProps)(reduxForm({
  enableReinitialize: true,
  form: 'eventForm'
})(EventForm))