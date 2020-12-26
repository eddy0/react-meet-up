import React from 'react'
import { Form, Formik, Field } from 'formik'
import { addEventChatComment } from '../../../app/firestore/firebaseService'
import { toast } from 'react-toastify'
import { Loader } from 'semantic-ui-react'
import * as Yup from 'yup'

function EventDetailChatForm({eventId, parentId, closeForm}) {
  
  const validationSchema = Yup.object({
    comment: Yup.string().required(),
  })
  
  const handleFormSubmit = async (values, {setSubmitting, resetForm}) => {
    values = {...values, parentId: parentId}
    console.log(values)
    try {
      await addEventChatComment(eventId, values)
      resetForm()
      closeForm()
    } catch (error) {
      toast.error(error.message)
    } finally {
      setSubmitting(false)
    }
  }
  
  const handleKeyPress = (e, handleSubmit, isValid) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      isValid && handleSubmit()
    }
  }
  
  return (
    <Formik
      initialValues={{
        comment: '',
      }}
      onSubmit={handleFormSubmit}
      validationSchema={validationSchema}
    >
      {
        ({isSubmitting, handleSubmit, isValid}) => {
          return (
            <Form className={'ui form'}>
              <Field name={'comment'}>
                {({field}) => {
                  return (
                    <div style={{position: 'relative'}}>
                      <Loader active={isSubmitting}/>
                      <textarea rows={2} {...field} placeholder={'Enter your comment'}
                                onKeyPress={(e) => handleKeyPress(e, handleSubmit, isValid)}/>
                    </div>
                  )
                }}
              </Field>
              {/*<Button type={'submit'} loading={isSubmitting} content={'Add reply'} icon={'edit'} />*/}
            </Form>
          )
        }
      }
    
    </Formik>
  )
}

export default EventDetailChatForm