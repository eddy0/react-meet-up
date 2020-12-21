import React from 'react'
import { Button, FormField, Header, Segment } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { createEvent, updateEvent } from '../eventActions'
import cuid from 'cuid'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import MyTextInput from '../../../common/form/MyTextInput'

const EventForm = ({match, history}) => {
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
  
  const handleFormSubmit = (values) => {
    selectedEvent
      ? dispatch(updateEvent({...selectedEvent, ...values}))
      : dispatch(createEvent({
        ...values,
        id: cuid(),
        hostedBy: 'Bob',
        attendees: [],
        hostPhotoURL: '/assets/user.png',
      }))
    history.push('/events')
  }
  
  const validationSchema = Yup.object({
    title: Yup.string().required('you must provide a title'),
    category: Yup.string().required('you must provide a category'),
    description: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
    date: Yup.string().required(),
  })
  
  return (
    <Segment clearing>
      <Formik
        initialValues={initialValue}
        onSubmit={handleFormSubmit}
        validationSchema={validationSchema}
      >
        <Form className={'ui form'}>
          <Header sub color={'teal'} content={'Event Details'}/>
          <MyTextInput name={'title'} placeholde={'Event Title'}/>
          <MyTextInput name={'category'} placeholde={'Event Category'}/>
          <MyTextInput name={'description'} placeholde={'Event description'}/>
          
          <Header sub color={'teal'} content={'Event Location Details'}/>
          <MyTextInput name={'city'} placeholde={'Event city'}/>
          <MyTextInput name={'venue'} placeholde={'Event venue'}/>
          <FormField>
            <Field name={'date'} type="date" placeholder={'Event Date'}/>
          </FormField>
          
          <Button type={'submit'} floated={'right'} positive={true} content={'submit'}/>
          <Button type={'submit'} floated={'right'} content={'cancel'}/>
        </Form>
      
      </Formik>
    
    </Segment>
  )
}

export default EventForm