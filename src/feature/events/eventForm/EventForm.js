import React from 'react'
import { Button, FormField, Header, Segment } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { createEvent, listenToEvents, updateEvent } from '../eventActions'
import cuid from 'cuid'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import MyTextInput from '../../../common/form/MyTextInput'
import MyTextArea from '../../../common/form/MyTextArea'
import MySelectInput from '../../../common/form/MySelectInput'
import { categoryData } from '../../../app/api/categoryOptions'
import MyDateInput from '../../../common/form/MyDateInput'
import { Link, Redirect } from 'react-router-dom'
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc'
import {
  addEventToFirestore,
  listenToEventFromFirestore,
  updateEventToFirestore
} from '../../../app/firestore/fireStoreService'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { toast } from 'react-toastify'
import { log } from '../../../common/util/util'

const EventForm = ({match, history}) => {
  const selectedEvent = useSelector(state => state.event.events.find(e => e.id === match.params.id))
  const dispatch = useDispatch()

  const initialValue = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    data: '',
  }

  const handleFormSubmit = async (values, {setSubmitting}) => {
    try {
      selectedEvent
        ? await updateEventToFirestore(values)
        : await addEventToFirestore(values)
      setSubmitting(false)
      history.push('/events')

    } catch (error) {
      toast.error(error.message)
      setSubmitting(false)
    }

  }

  const validationSchema = Yup.object({
    title: Yup.string().required('you must provide a title'),
    category: Yup.string().required('you must provide a category'),
    description: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
    date: Yup.string().required(),
  })


  useFirestoreDoc({
    shouldExcute: !!match.params.id,
    query: () => listenToEventFromFirestore(match.params.id),
    callback: (event) => dispatch(listenToEvents([event])),
    deps: [match.params.id, dispatch],
  })

  const {loading, error} = useSelector(state => state.async)


  if (loading) {
    return <LoadingComponent content={'loading event...'}/>
  }

  if (error) {
    return <Redirect to={'/error'}/>
  }

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValue}
        onSubmit={handleFormSubmit}
        validationSchema={validationSchema}
      >
        {({isSubmitting, dirty, isValid}) => {
          return (
            <Form className={'ui form'}>
              <Header sub color={'teal'} content={'Event Details'}/>
              <MyTextInput name={'title'} placeholder={'Event Title'}/>
              <MySelectInput name={'category'} placeholder={'Event Category'} options={categoryData}/>
              <MyTextArea name={'description'} placeholder={'Event description'} rows={3}/>

              <Header sub color={'teal'} content={'Event Location Details'}/>
              <MyTextInput name={'city'} placeholder={'Event city'}/>
              <MyTextInput name={'venue'} placeholder={'Event venue'}/>
              <MyDateInput
                name={'date'}
                placeholderText={'Event Date'}
                timeFormat={'HH:mm'}
                showTimeSelect={true}
                timeCaption={'time'}
                dateFormat={'MMMM d, yyyy h:mm a'}
              />

              <Button loading={isSubmitting}
                      disabled={!isValid || !dirty || isSubmitting}
                      type={'submit'}
                      floated={'right'}
                      positive={true}
                      content={'submit'}
              />
              <Button
                disabled={isSubmitting}
                as={Link}
                to={'/events'}
                type={'submit'}
                floated={'right'}
                content={'cancel'}
              />
            </Form>
          )
        }
        }
      </Formik>
    </Segment>
  )
}

export default EventForm