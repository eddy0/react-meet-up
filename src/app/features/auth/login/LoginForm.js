import React from 'react'
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import TextInput from '../../../component/common/form/TextInput'
import { handleLogin, socialLogin } from '../../../../action/authAction'
import SocialLogin from '../socialLogin/SocialLogin'


const LoginForm = ({login, handleSubmit, error, socialLogin}) => {
  return (
    <Form size="large" onSubmit={handleSubmit(login)}>
      <Segment>
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
        <Button fluid size="large" color="teal">
          Login
        </Button>
        <Divider horizontal>Or</Divider>
        <SocialLogin socialLogin={socialLogin}/>
      </Segment>
    </Form>
  )
}


const actions = {
  login: handleLogin,
  socialLogin: socialLogin,
}

export default connect(null, actions)(reduxForm({form: 'loginForm'})(LoginForm))