import React from 'react'
import {Form, Input,Label, Icon} from 'semantic-ui-react'

// input: name, onBlur, onchange, onDrageStart, onDrop, onFocus, value
// meta: active, asyncValidating: autofilled error

const TextInput = (props) => {
    const {input, type, placeholder, label, required, meta: { touched, error, warning }} = props
    return (

        <Form.Field  required={required} >

            <label>{label}</label>
            <Input style={{width: 200, marginRight: '1rem'}} {...input} placeholder={placeholder} type={type} />
            {
                touched &&
                ( (error && <Label color='red' pointing='left'>{error}</Label>) ||
                (warning && <Label color='orange' pointing='left'>{warning}</Label>))
            }
            {
                touched && !error && !warning &&
                    <Icon name='check circle' color='green'/>
            }

        </Form.Field>

    )
}

export default TextInput
