import React from 'react'
import {Form} from 'semantic-ui-react'



const RadioInput = (props) => {
    const {input, type, label} = props
    return (
        <Form.Field>
            <div className='ui radio'>
                <input id={label} {...input} type={type}  />
                {' '}
                <label htmlFor={label}>{label}</label>
            </div>
        </Form.Field>
    )

}

export default RadioInput