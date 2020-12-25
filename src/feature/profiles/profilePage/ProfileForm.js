import React from 'react'
import { Form, Formik } from 'formik'
import MyTextInput from '../../../common/form/MyTextInput'
import MyTextArea from '../../../common/form/MyTextArea'
import { Button } from 'semantic-ui-react'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { updateUserProfile } from '../../../app/firestore/fireStoreService'

function ProfileForm({profile}) {
  
  const validationSchema = Yup.object({
    displayName: Yup.string().required(),
  })
  
  const handleSubmit = async (values, {setSubmitting}) => {
    try {
      await updateUserProfile(values)
      
    } catch (error) {
      toast.error(error.message)
    } finally {
      setSubmitting(false)
    }
    
  }
  
  return (
    <Formik
      initialValues={{
        displayName: profile.displayName,
        description: profile.description || '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({isSubmitting, isValid, dirty}) => {
        return (
          <Form className={'ui form'}>
            <MyTextInput name={'displayName'} placeholder={'display Name'}/>
            <MyTextArea name={'description'} placeholder={'description'}/>
            <Button loading={isSubmitting} disabled={isSubmitting || !isValid || !dirty} floated={'right'}
                    type={'submit'} size={'large'} positive content={'update profile'}/>
          </Form>
        )
      }}
    
    </Formik>
  )
}

export default ProfileForm