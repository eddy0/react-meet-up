import React  from 'react'
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import TextInput from '../../../app/component/common/form/TextInput'



const RegisterForm = ({login, handleSubmit, error, socialLogin}) => {
  return (
    <Form size="large" onSubmit={handleSubmit(login)}>
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
        <Button fluid size="large" color="teal">
         register
        </Button>
        <Divider horizontal>Or</Divider>
        {/*<SocialLogin socialLogin={socialLogin}/>*/}
      </Segment>
    </Form>
  );
};

const actions = {
}

export default connect(null, actions)(reduxForm({form: 'registerForm'})(RegisterForm))