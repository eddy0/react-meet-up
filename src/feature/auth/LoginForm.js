import React from 'react'
import ModalWrapper from '../../common/modals/ModalWrapper'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import MyTextInput from '../../common/form/MyTextInput'
import { Button } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { signInUser } from './authActions'
import { closeModal } from '../../common/modals/modalReducer'

function LoginForm(props) {
  const dispatch = useDispatch()
  
  const validationSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  })
  
  const handleSubmit = (values, {setSubmitting}) => {
    dispatch(signInUser(values))
    setSubmitting(false)
    dispatch(closeModal())
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
        {({isSubmitting, dirty, isValid}) => {
          return (
            <Form className={'ui form'}>
              <MyTextInput name={'email'} placeholder={'email'}/>
              <MyTextInput name={'password'} type={'password'} placeholder={'password'}/>
              <Button
                loading={isSubmitting}
                disabled={!isValid|| !dirty || isSubmitting}
                type={'submit'}
                fluid={true}
                size={'large'}
                color={'teal'}
                content={'Login'}
              />
            </Form>
          )
        }}
      
      
      </Formik>
    
    </ModalWrapper>
  )
}

export default LoginForm