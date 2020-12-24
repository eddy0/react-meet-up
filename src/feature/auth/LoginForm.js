import React from 'react'
import ModalWrapper from '../../common/modals/ModalWrapper'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import MyTextInput from '../../common/form/MyTextInput'
import { Button, Divider, Label } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { signInUser } from './authActions'
import { closeModal } from '../../common/modals/modalReducer'
import { signInWithEmail } from '../../app/firestore/firebaseService'
import SocialLogin from './SocialLogin'

function LoginForm(props) {
  const dispatch = useDispatch()
  
  const validationSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  })
  
  const handleSubmit = async (values, {setSubmitting, setErrors}) => {
    try {
      await signInWithEmail(values)
      setSubmitting(false)
      dispatch(closeModal())
    } catch (error) {
      setErrors({auth: error.message})
      setSubmitting(false)
      console.log(error)
    }
  }
  
  return (
    <ModalWrapper size={'mini'} header={'Login in'}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({isSubmitting, dirty, isValid, errors}) => {
          return (
            <Form className={'ui form'}>
              <MyTextInput name={'email'} placeholder={'email'}/>
              <MyTextInput name={'password'} type={'password'} placeholder={'password'}/>
              {errors.auth && <Label basic color={'red'} style={{marginBottom: 10}} content={errors.auth}/>}
              <Button
                loading={isSubmitting}
                disabled={!isValid || !dirty || isSubmitting}
                type={'submit'}
                fluid={true}
                size={'large'}
                color={'teal'}
                content={'Login'}
              />
              {/*<Divider horizontal> Or </Divider>*/}
              {/*<SocialLogin />*/}
            </Form>

          )
        }}
      
      
      </Formik>
    
    </ModalWrapper>
  )
}

export default LoginForm