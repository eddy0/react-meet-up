import React from 'react'
import { Button, Form, Header, Label, Segment } from 'semantic-ui-react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import MyTextInput from '../../common/form/MyTextInput'
import { updateUserPassword } from '../../app/firestore/firebaseService'

function AccountPage(props) {

  const {currentUser} = useSelector((state) => state.auth)
  const validationSchema = Yup.object({
    newPassword1: Yup.string().required('Password is required'),
    newPassword2: Yup.string().oneOf(
      [Yup.ref('newPassword1'), null],
      'Passwords do not match'
    )
  })


  const handleSubmit = async (values, {setSubmitting, setErrors}) => {
    try {
      await updateUserPassword(values)
    } catch (error) {
      setErrors({auth: error.message})
    } finally {
      setSubmitting(false)
    }
  }


  return (
    <Segment>
      <Header dividing size='large' content='Account'/>
      {currentUser.providerId === 'password' &&
      <>
        <Header color='teal' sub content='Change Password'/>
        <p>Use this form to change your password</p>
        <Formik
          initialValues={{newPassword1: '', newPassword2: ''}}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({errors, isSubmitting, isValid, dirty}) => (
            <Form className='ui form'>
              <MyTextInput
                name='newPassword1'
                type='password'
                placeholder='New Password'
              />
              <MyTextInput
                name='newPassword2'
                type='password'
                placeholder='Confirm Password'
              />
              {errors.auth && (
                <Label
                  basic
                  color='red'
                  style={{marginBottom: 10}}
                  content={errors.auth}
                />
              )}
              <Button
                style={{display: 'block'}}
                type='submit'
                disabled={!isValid || isSubmitting || !dirty}
                loading={isSubmitting}
                size='large'
                positive
                content='Update password'
              />
            </Form>
          )}
        </Formik>

      </>
      }
    </Segment>
  )
}


export default AccountPage