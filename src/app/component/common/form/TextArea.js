import React from 'react'
import {Form, Icon, Label} from 'semantic-ui-react'


export default function TextArea(props) {
    const {input, rows, type, placeholder, label,  required, meta: { touched, error, warning }} = props

    return (
        <Form.Field required={required} error={touched && !!error}>
            <label>{label}</label>
            <textarea {...input} placeholder={placeholder} rows={rows} />
            {
                required && touched &&
                ( (error && <Label color='red' pointing='left'>{error}</Label>) ||
                    (warning && <Label color='orange' pointing='left'>{warning}</Label>))
            }
            {
                required && touched && !error && !warning &&
                <Icon name='check circle' color='green'/>
            }
        </Form.Field>
    )

}

