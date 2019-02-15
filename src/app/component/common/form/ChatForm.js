import React, {Component} from 'react'
import {Button, Form} from 'semantic-ui-react'
import {Field, reduxForm} from 'redux-form'
import TextArea from './TextArea'


class ChatForm extends Component {

    handleSubmit = (values) => {
        const {eventId, parentId, actionAddComment ,handleCancelReplyForm, replyTo, reset} = this.props
        actionAddComment(eventId, values, parentId, replyTo)
        if (parentId !== 0) {
            handleCancelReplyForm()
        }
        reset()
    }

    render() {
        return (
            <Form reply onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                <Field
                    name='comment'
                    type='text'
                    row={2}
                    component={TextArea}
                />

                <Button
                    content="Add Reply"
                    labelPosition="left"
                    icon="edit"
                    primary
                />
            </Form>
        )
    }
}


export default reduxForm({form: 'comment'})(ChatForm)