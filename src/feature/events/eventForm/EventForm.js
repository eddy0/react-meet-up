import React, { useState } from 'react'
import { Button, FormField, Header, Segment } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { createEvent, updateEvent } from '../eventActions'
import cuid from 'cuid'
import { Formik, Form, Field } from 'formik'

const EventForm = ({match}) => {
  const selectedEvent = useSelector(state => state.event.events.find(e => e.id === match.params.id))
  const dispatch = useDispatch()

  const initialValue = {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    data: '',
  }

  const [values, setValues] = useState(initialValue)

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]: value})
  }

  const handleFormSubmit = () => {
    selectedEvent
      ? dispatch(updateEvent({...selectedEvent, ...values}))
      : dispatch(createEvent({
        ...values,
        id: cuid(),
        hostedBy: 'Bob',
        attendees: [],
        hostPhotoURL: '/assets/user.png'
      }))
  }

  return (
    <Segment clearing>
      <Header content={'create new event'}/>
      <Formik
        initialValues={initialValue}
        onSubmit={values => console.log(values)}
      >
        <Form className={'ui form'}>
          <FormField>
            <Field name={'title'} placeholder={'Event Title'} />
          </FormField>
          <FormField>
            <Field name={'category'} placeholder={'Category'} />
          </FormField>
          <FormField>
            <Field name={'description'} placeholder={'Event Description'} />
          </FormField>
          <FormField>
            <Field name={'city'} placeholder={'Event City'} />
          </FormField>
          <FormField>
            <Field name={'venue'} placeholder={'Event Venue'} />
          </FormField>
          <FormField>
            <Field name={'date'} type="date" placeholder={'Event Date'} />
          </FormField>

          <Button type={'submit'} floated={'right'} positive={true} content={'submit'}/>
          <Button type={'submit'} floated={'right'} content={'cancel'}/>
        </Form>

      </Formik>

    </Segment>
  )
}

export default EventForm