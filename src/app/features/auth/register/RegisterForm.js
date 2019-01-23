import React from 'react'
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import TextInput from '../../../component/common/form/TextInput'
import { handleRegister } from '../../../../action/authAction'
import { combineValidators, isRequired } from 'revalidate'




const RegisterForm = ({register, handleSubmit, error, invalid, submitting, socialLogin}) => {
  return (
    <Form size="large" onSubmit={handleSubmit(register)}>
      <Segment>
        <Field
          name="displayName"
          component={TextInput}
          type="text"
          placeholder="displayName"
        />
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Address"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
          placeholder="password"
        />
        {error && <Label basic color='red'>{error}</Label>}
        <Button fluid size="large" color="teal" disabled={invalid || submitting}>
          register
        </Button>
        <Divider horizontal>Or</Divider>
        {/*<SocialLogin socialLogin={socialLogin}/>*/}
      </Segment>
    </Form>
  )
}


const validate = combineValidators({
  displayName: isRequired('displayName'),
  email: isRequired('email'),
  password: isRequired('password'),
})


const actions = {
  register: handleRegister
}

export default connect(null, actions)(reduxForm({form: 'registerForm', validate: validate})(RegisterForm))