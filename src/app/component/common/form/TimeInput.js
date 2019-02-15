import React, {Component} from 'react'
import { TimePicker} from 'antd'
import {Form, Input,Label, Icon} from 'semantic-ui-react'
import moment from 'moment'



class TimeInput extends Component {

    change = (value) => {
        console.log('value', value)

    }

    render() {
        let {input: {value, onChange, onBlur,...restInput},  label, required, meta: { touched, error, warning }, ...rest} = this.props
        return (
            <Form.Field required={required}   >
                <label >{label}</label>
                <TimePicker
                    value={ value ? moment(value) : null}
                    {...rest}
                    use12Hours
                    format="h:mm A"
                    onChange={onChange} />
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
}

export default TimeInput